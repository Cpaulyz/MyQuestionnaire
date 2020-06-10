<div style="text-align:center;">表1 
    user

| 名称 | 列名     | 类型        | 可空 | 说明 |
| ---- | -------- | ----------- | ---- | ---- |
| 键   | id       | int         | N    | key  |
| 名称 | name     | varchar(20) | N    |      |
| 密码 | password | varchar(20) | N    |      |

<div style="text-align:center;">表2 paper

| 名称     | 列名        | 类型        | 可空 | 说明                    |
| -------- | ----------- | ----------- | ---- | ----------------------- |
| 键       | id          | int         | N    | key                     |
| 创建用户id | user_id    | int         | N    |                   |
| 标题     | title       | varchar(64) | N    |                         |
| 说明     | description | varchar(64) | N    |                         |
| 状态     | status      | int         | N    | INIT: 初始化<br/> START: 已发放<br/>STOP: 停止发放|
| 开始时间 | start_time  | datetime    | Y    |                         |
| 结束时间 | end_time    | datetime    | Y    |                         |

<div style="text-align:center;">表3 question

| 名称     | 列名     | 类型        | 可空 | 说明                          |
| -------- | -------- | ----------- | ---- | ----------------------------- |
| 键       | id       | int         | N    | key                           |
| 所属问卷 | paper_id | int         | N    |                               |
| 问题类型 | type     | int         | N    | 1：单选<br>2：多选<br>3：简答 |
| 标题     | title    | varchar(64) | N    |                               |
*P.S.为了简单没设置混合类型，要的话再说吧*

<div style="text-align:center;">表4 options

| 名称     | 列名        | 类型        | 可空 | 说明 |
| -------- | ----------- | ----------- | ---- | ---- |
| 顺序       | sequence   | int         | N    | key  |
| 所属问题 | question_id | int         | N    |  key    |
| 内容     | content     | varchar(64) | N    |      |

<div style="text-align:center;">表5 answer

| 名称     | 列名           | 类型         | 可空 | 说明                                                         |
| -------- | -------------- | ------------ | ---- | ------------------------------------------------------------ |
| 键       | id             | int          | N    | key                                                          |
| 所属问卷 | paper_id       | int          | N    |                                                              |
| 所属问题 | question_id    | int          | N    |                                                              |
| 问题类型 | question_type  | int          | N    | 1：单选<br/>2：多选<br/>3：简答                              |
| 答题时间 | create_time    | datetime     | N    |                                                              |
| 答题内容 | answer_content | varchar(512) | N    | 1：单选格式类似sequence<br/>2：多选格式类似sequence,sequence<br/>3：简答格式类似xxxx |

