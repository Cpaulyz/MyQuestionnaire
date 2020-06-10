DROP TABLE IF EXISTS `USER`;
CREATE TABLE `USER`
(
  `id`       int         NOT NULL AUTO_INCREMENT,
  `name`     varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
)AUTO_INCREMENT=1;

INSERT INTO `USER` VALUES (1, 'test666', '123456');

DROP TABLE IF EXISTS `PAPER`;
CREATE TABLE `PAPER`
(
  `id`          int         NOT NULL AUTO_INCREMENT,
  `user_id`     int         NOT NULL,
  `title`       varchar(64) NOT NULL,
  `description` varchar(64) NOT NULL,
  `start_time`  datetime,
  `end_time`    datetime,
  `status`      varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `PAPER` VALUES (1, 1, '测试问卷1（编辑中）', '测试用问卷，拥有三个问题，尚未发布', NULL, NULL, 'INIT');
INSERT INTO `PAPER` VALUES (2, 1, '测试问卷2（已发布）', '测试用问卷，拥有三个问题，已发布', NULL, NULL, 'START');


DROP TABLE IF EXISTS `QUESTION`;
CREATE TABLE `QUESTION`
(
  `id`       int         NOT NULL AUTO_INCREMENT,
  `paper_id` int         NOT NULL,
  `type`     int,        -- 因为一开始添加问卷是只给paperId 剩下是空的 所以只能可以为null了
  `title`    varchar(64),
  PRIMARY KEY (`id`)
);

INSERT INTO `QUESTION` VALUES (1, 1, 1, '测试问卷666-1：单选题');
INSERT INTO `QUESTION` VALUES (2, 1, 2, '测试问卷666-2：多选题');
INSERT INTO `QUESTION` VALUES (3, 1, 3, '测试问卷666-3：填充题');
INSERT INTO `QUESTION` VALUES (4, 2, 1, '测试问卷667-1：单选题');
INSERT INTO `QUESTION` VALUES (5, 2, 2, '测试问卷667-2：多选题');
INSERT INTO `QUESTION` VALUES (6, 2, 3, '测试问卷667-3：填充题');

DROP TABLE IF EXISTS `OPTIONS`;
CREATE TABLE `OPTIONS`             -- OPTION为保留关键字，所以只能用复数形式了
(
  `question_id` int         NOT NULL,
  `sequence`    int         NOT NULL,
  `content`     varchar(64) NOT NULL,
  PRIMARY KEY (`question_id`,`sequence`)
);

INSERT INTO `OPTIONS` VALUES (1, 1, '666-1-选项一');
INSERT INTO `OPTIONS` VALUES (1, 2, '666-1-选项二');
INSERT INTO `OPTIONS` VALUES (2, 1, '666-2-选项一');
INSERT INTO `OPTIONS` VALUES (2, 2, '666-2-选项二');
INSERT INTO `OPTIONS` VALUES (2, 3, '666-2-选项三');
INSERT INTO `OPTIONS` VALUES (2, 4, '666-2-选项四');
INSERT INTO `OPTIONS` VALUES (4, 1, '667-1-选项一');
INSERT INTO `OPTIONS` VALUES (4, 2, '667-1-选项二');
INSERT INTO `OPTIONS` VALUES (5, 1, '667-2-选项一');
INSERT INTO `OPTIONS` VALUES (5, 2, '667-2-选项二');
INSERT INTO `OPTIONS` VALUES (5, 3, '667-2-选项三');
INSERT INTO `OPTIONS` VALUES (5, 4, '667-2-选项四');

DROP TABLE IF EXISTS `ANSWER`;
CREATE TABLE `ANSWER`
(
  `id`            int          NOT NULL AUTO_INCREMENT,
  `question_id`   int          NOT NULL,
  `paper_id`      int          NOT NULL,
  `question_type` int          NOT NULL,
  `create_time`   datetime     NOT NULL,
  `answer_content` varchar(512) NOT NULL ,
  PRIMARY KEY (`id`)
);

INSERT INTO `ANSWER` VALUES (1, 4, 2, 1, '1000-01-01 00:00:00', '2');
INSERT INTO `ANSWER` VALUES (2, 5, 2, 2, '1000-01-01 00:00:00', '2,3');
INSERT INTO `ANSWER` VALUES (3, 6, 2, 3, '1000-01-01 00:00:00', '测试问卷667-3：foofoofoofoo');
INSERT INTO `ANSWER` VALUES (4, 4, 2, 1, '1000-01-01 00:00:00', '2');
INSERT INTO `ANSWER` VALUES (5, 5, 2, 2, '1000-01-01 00:00:00', '1,3');
INSERT INTO `ANSWER` VALUES (6, 6, 2, 3, '1000-01-01 00:00:00', '测试问卷667-3：bazbazbaz');
INSERT INTO `ANSWER` VALUES (7, 4, 2, 1, '1000-01-01 00:00:00', '1');
INSERT INTO `ANSWER` VALUES (8, 5, 2, 2, '1000-01-01 00:00:00', '1,2,3,4');
INSERT INTO `ANSWER` VALUES (9, 6, 2, 3, '1000-01-01 00:00:00', '测试问卷667-3：barbarabr');
INSERT INTO `ANSWER` VALUES (10, 4, 2, 1, '1000-01-01 00:00:00', '2');
INSERT INTO `ANSWER` VALUES (11, 5, 2, 2, '1000-01-01 00:00:00', '4');
INSERT INTO `ANSWER` VALUES (12, 6, 2, 3, '1000-01-01 00:00:00', '测试问卷667-3：hhhhhhhhh');

-- division --

-- INSERT INTO USER(PASSWORD, NAME) VALUES ('admin','admin');
--
-- INSERT INTO PAPER(USER_ID,TITLE,DESCRIPTION, START_TIME, END_TIME, STATUS) VALUES (1,'测试问卷1','这是一个问卷','2020-04-22 00:00:00','2020-06-15 00:00:00','INIT');
--
-- insert into QUESTION(paper_id, type, title) values (1,1,'第一个问题 单选题');
-- insert into QUESTION(paper_id, type, title) values (1,2,'第二个问题 多选题');
-- insert into QUESTION(paper_id, type, title) values (1,3,'第三个问题 简答题');
--
-- insert into OPTIONS(question_id, sequence, content) values (1,1,'单选A');
-- insert into OPTIONS(question_id, sequence, content) values (1,2,'单选B');
-- insert into OPTIONS(question_id, sequence, content) values (2,1,'多选A');
-- insert into OPTIONS(question_id, sequence, content) values (2,2,'多选B');
-- insert into OPTIONS(question_id, sequence, content) values (2,3,'多选C');
--
-- INSERT INTO ANSWER(QUESTION_ID, PAPER_ID, QUESTION_TYPE, CREATE_TIME, ANSWER_CONTENT) VALUES (1,1,1,'2020-04-22 19:00:00','1');
-- INSERT INTO ANSWER(QUESTION_ID, PAPER_ID, QUESTION_TYPE, CREATE_TIME, ANSWER_CONTENT) VALUES (2,1,2,'2020-04-22 19:00:00','3,4');
-- INSERT INTO ANSWER(QUESTION_ID, PAPER_ID, QUESTION_TYPE, CREATE_TIME, ANSWER_CONTENT) VALUES (3,1,3,'2020-04-22 19:00:00','我是简答题答案');