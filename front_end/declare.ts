interface Answer {
    questionId: number; // 所属问题 id
    content: string; // 选项内容
}

interface Option {
    id: number; // 选项id
    questionId: number; // 所属问题 id
    content: string; // 选项内容
    selectNum: number; // 选中数量
    // 默认 0
}

interface Question {
    id?: number; // 题目 id
    type: number; // 题目类型：1 单选、2 多选、3 简答
    title: string; // 题目说明
    options: Option[]; // 选项列表
    // 默认 []
}

interface Paper {
    id?: number; // 问卷唯一标示
    userId: number; // 所属用户
    title: string; // 标题
    description: string; // 说明
    start_time?: Date; // 开始发放时间
    end_time?: Date; // 结束发放时间
    status: boolean; // 状态：1 编辑中、2 已发放、3 停止回收
    // 默认 1
    written: number; // 填写量
    // 默认 0
    visited: number; // 访问量
    // 默认 0
}

interface UserInfo {
    id: number;
    name: number;
    password: string;
}

interface UserParam {
    name: string;
    password: string;
}