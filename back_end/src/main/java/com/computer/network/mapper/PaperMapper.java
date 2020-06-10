package com.computer.network.mapper;

import com.computer.network.enums.PaperStatus;
import com.computer.network.po.Paper;
import com.computer.network.vo.PaperVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface PaperMapper {

    int addPaper(PaperVO paperVO);

    void updatePaper(PaperVO paperVO);

    PaperVO selectByPaperId(int paperId);

    void deletePaper(int paperId);

    List<PaperVO> getUserPapers(int userId);

    List<PaperVO> getTimePapers();

    void changeStatus(@Param("paperStatus") PaperStatus paperStatus, @Param("id") int id);
}
