package com.computer.network.service;

import com.computer.network.vo.PaperVO;
import com.computer.network.vo.ResponseVO;

public interface PaperService {

    ResponseVO addPaper(PaperVO paperVO);

    ResponseVO updatePaper(PaperVO paperVO);

    ResponseVO deletePaper(int paperId);

    ResponseVO getUserPapers(int userId);

    ResponseVO checkPaper(int paperId);

    ResponseVO reviewPaper(int paperId);
}
