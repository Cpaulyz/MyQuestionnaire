package com.computer.network.serviceImpl;

import com.computer.network.enums.PaperStatus;
import com.computer.network.mapper.AnswerMapper;
import com.computer.network.mapper.OptionsMapper;
import com.computer.network.mapper.PaperMapper;
import com.computer.network.mapper.QuestionMapper;
import com.computer.network.po.Options;
import com.computer.network.po.Question;
import com.computer.network.service.PaperService;
import com.computer.network.vo.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PaperServiceImpl implements PaperService {
    private final static String EMPTY="无效ID";
    private final static String USER_EMPTY="用户未创建任何问卷";
    @Autowired
    PaperMapper paperMapper;
    @Autowired    //注意每个都得Autowired 不能只写一个
    QuestionMapper questionMapper;
    @Autowired
    OptionsMapper optionsMapper;
    @Autowired
    AnswerMapper answerMapper;

    @Override
    public ResponseVO addPaper(PaperVO paperVO) {
        try {
            paperMapper.addPaper(paperVO);
            return ResponseVO.buildSuccess(paperVO);
        }catch (Exception e){
            System.out.println(e);
            return ResponseVO.buildFailure(e.getMessage());
        }
    }

    @Override
    public ResponseVO updatePaper(PaperVO paperVO) {
        try {
            PaperVO paper=paperMapper.selectByPaperId(paperVO.getId());
            if(paper==null)
                return ResponseVO.buildFailure(EMPTY);
            else{
                paperMapper.updatePaper(paperVO);
                return ResponseVO.buildSuccess();
            }
        }catch (Exception e){
            System.out.println(e);
            return ResponseVO.buildFailure(e.getMessage());
        }
    }
    @Scheduled(cron = "0 0/1 * * * ?")    //每分钟检查一次
    void checkPaperStatus(){
        List<PaperVO> paperVOList=paperMapper.getTimePapers();
        for(PaperVO paperVO:paperVOList){
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String currentDate = sdf.format(date);
            if(paperVO.getStatus()==PaperStatus.INIT){    //没开放的开放它
                if(currentDate.compareTo(paperVO.getStartTime())>=0)
                    paperMapper.changeStatus(PaperStatus.START,paperVO.getId());
            }
            else if(paperVO.getStatus()==PaperStatus.START){   //没结束的结束它
                if(currentDate.compareTo(paperVO.getEndTime())>=0)
                    paperMapper.changeStatus(PaperStatus.STOP,paperVO.getId());
            }
        }
    }

    @Override
    public ResponseVO deletePaper(int paperId) {
        try {
            PaperVO paper=paperMapper.selectByPaperId(paperId);
            if(paper==null)
                return ResponseVO.buildFailure(EMPTY);
            else{
                paperMapper.deletePaper(paperId);
                List<Question> questionList=questionMapper.selectByPaperId(paperId);
                for(Question question:questionList)
                    optionsMapper.deleteByQuestionId(question.getId());
                questionMapper.deleteByPaperId(paperId);
                return ResponseVO.buildSuccess();
            }
        }catch (Exception e){
            System.out.println(e);
            return ResponseVO.buildFailure(e.getMessage());
        }
    }

    @Override
    public ResponseVO getUserPapers(int userId) {
        try {
            List<PaperVO> paperVOList=paperMapper.getUserPapers(userId);
            if(paperVOList==null)
                return ResponseVO.buildFailure(USER_EMPTY);
            else
                return ResponseVO.buildSuccess(paperVOList);
        }catch (Exception e){
            System.out.println(e);
            return ResponseVO.buildFailure(e.getMessage());
        }
    }

    @Override
    public ResponseVO checkPaper(int paperId) {
        try {
            PaperVO paperVO=paperMapper.selectByPaperId(paperId);
            if(paperVO==null)
                return ResponseVO.buildFailure(EMPTY);
            PaperDetail paperDetail=new PaperDetail();
            BeanUtils.copyProperties(paperVO,paperDetail);

            List<QuestionVO> questionVOList=new ArrayList<>();
            List<Question> questionList=questionMapper.selectByPaperId(paperId);
            for(Question question:questionList){
                int questionId=question.getId();
                List<Options> optionsList=optionsMapper.selectByQuestionId(questionId);

                QuestionVO questionVO=new QuestionVO();
                BeanUtils.copyProperties(question,questionVO);
                questionVO.setOptions(optionsList);
                questionVOList.add(questionVO);
            }
            paperDetail.setQuestionList(questionVOList);
            return ResponseVO.buildSuccess(paperDetail);

        }catch (Exception e){
            System.out.println(e);
            return ResponseVO.buildFailure(e.getMessage());
        }
    }

    @Override
    public ResponseVO reviewPaper(int paperId) {
        try {
            PaperVO paperVO=paperMapper.selectByPaperId(paperId);
            if(paperVO==null)
                return ResponseVO.buildFailure(EMPTY);
            else{
                PaperStatistic paperStatistic=new PaperStatistic();
                BeanUtils.copyProperties(paperVO,paperStatistic);

                List<QuestionStatistic> questionStatisticList=new ArrayList<>();
                List<Question> questionList=questionMapper.selectByPaperId(paperId);

                for(Question question:questionList){

                    QuestionStatistic questionStatistic=new QuestionStatistic();
                    BeanUtils.copyProperties(question,questionStatistic);

                    int questionId=question.getId();

                    if(question.getType()!=3){    //单选题和多选题
                        List<Options> optionsList=optionsMapper.selectByQuestionId(questionId);
                        List<OptionStatistic> optionStatisticList =new ArrayList<>();
                        for(Options options:optionsList){   //先都转成另一个VO
                            OptionStatistic optionStatistic =new OptionStatistic();
                            BeanUtils.copyProperties(options, optionStatistic);
                            optionStatistic.setSelectedNum(0);   //后面用于+1
                            optionStatisticList.add(optionStatistic);
                        }

                        List<AnswerVO> answerVOList=answerMapper.selectByQuestionId(questionId);

                        for(AnswerVO answerVO:answerVOList){
                            String answerContent=answerVO.getAnswerContent();
                            String[] optionSequenceList=answerContent.split(",");
                            for(String sequenceStr:optionSequenceList){
                                int sequence=Integer.valueOf(sequenceStr);
                                for(OptionStatistic optionStatistic : optionStatisticList){
                                    if(optionStatistic.getSequence()==sequence){
                                        optionStatistic.setSelectedNum(optionStatistic.getSelectedNum()+1);
                                        break;
                                    }
                                }
                            }
                        }
                        questionStatistic.setOptionStatistics(optionStatisticList);
                    }
                    else{    //简答题
                        questionStatistic.setAnswerVOList(answerMapper.selectByQuestionId(questionId));
                    }
                    questionStatistic.setFilledInNum(answerMapper.selectByQuestionId(questionId).size());   //此题填写人数
                    questionStatisticList.add(questionStatistic);
                }
                paperStatistic.setQuestionStatistics(questionStatisticList);
                return ResponseVO.buildSuccess(paperStatistic);
            }
        }catch (Exception e){
            System.out.println(e);
            return ResponseVO.buildFailure(e.getMessage());
        }
    }

}
