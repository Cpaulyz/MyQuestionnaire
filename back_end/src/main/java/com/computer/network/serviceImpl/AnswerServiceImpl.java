package com.computer.network.serviceImpl;

import com.computer.network.enums.PaperStatus;
import com.computer.network.mapper.AnswerMapper;
import com.computer.network.mapper.PaperMapper;
import com.computer.network.service.AnswerService;
import com.computer.network.vo.AnswerVO;
import com.computer.network.vo.PaperVO;
import com.computer.network.vo.ResponseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerServiceImpl implements AnswerService {
    private final static String EARLY="问卷未开始发放";
    private final static String INVALIDATION="问卷已失效";
    @Autowired
    AnswerMapper answerMapper;
    @Autowired
    PaperMapper paperMapper;

    @Override
    public ResponseVO addAnswers(List<AnswerVO> answerVOList) {
        try {
            int paperId=answerVOList.get(0).getPaperId();
            PaperVO paperVO=paperMapper.selectByPaperId(paperId);
            if(paperVO.getStartTime()!=null && paperVO.getEndTime()!=null){
                if(paperVO.getStatus()== PaperStatus.INIT)
                    return ResponseVO.buildFailure(EARLY);
                if(paperVO.getStatus()== PaperStatus.STOP)
                    return ResponseVO.buildFailure(INVALIDATION);
            }
            for(AnswerVO answerVO:answerVOList)
                answerMapper.addAnswer(answerVO);
            return ResponseVO.buildSuccess();
        }catch (Exception e){
            System.out.println(e);
            return ResponseVO.buildFailure(e.getMessage());
        }
    }
}
