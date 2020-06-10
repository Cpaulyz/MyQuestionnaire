# 接口约定

| path                                      | type | usage            |
| ----------------------------------------- | ---- | ---------------- |
| /api/user/register                        | POST | 注册             | UserParam | SimpleResponse |
| /api/user/login                           | POST | 登入             | UserParam | UserInfoResponse |
| /api/paper/{userId}/getUserPapers         | GET  | 查看用户所有问卷 | userId | PaperListResponse |
| /api/paper/{paperId}/checkPaper           | GET  | 查看完整问卷     |
| /api/paper/{paperId}/reviewPaper          | GET  | 查看问卷统计信息 |
| /api/paper/addPaper                       | POST | 添加问卷         | PaperParam | AddPaperResponse |
| /api/paper/updatePaper                    | POST | 修改问卷         |
| /api/question/{paperId}/addQuestion       | GET  | 添加问题         |
| /api/question/{questionId}/deleteQuestion | GET  | 删除问题         |
| /api/question/updateQuestion              | POST | 更新问题         |
| /api/answer/addAnswers                    | POST | 填写问卷         |

## 注册

- 方法类类型：POST

- 请求 url：/api/user/register

- RequestBody：

```ts
{
  name: string, // 用户名
  password: string // 密码
}
```

- ResponseBody：

```ts
{
  success: boolean, // 成功与否
  message: string,
  content: null | string
}
```

## 登入

- 方法类类型：POST

- 请求 url：/api/user/login

- RequestBody：

```ts
{
  name: string, // 用户名
  password: string // 密码
}
```

- ResponseBody：

```ts
{
  success: boolean, // 成功与否
  message: string,
  content: {
    id: number, // 用户 Id
    name: string,
    password: string
  }
}
```

## 查看用户所有问卷

- 方法类类型：GET

- 请求 url：/api/paper/{userId}/getUserPapers

- RequestParam：

```ts
userId: number // 用户 Id
```

- ResponseBody：

```ts
{
  success: boolean, // 成功与否
  message: string,
  content: Paper[] // 问卷列表
}
```

```ts
interface Paper {
  id: number // 问卷唯一标示
  userId: number // 所属用户
  title: string // 标题
  description: string // 说明
  start_time: Date // 开始发放时间
  end_time: Date // 结束发放时间
  status: boolean // 状态：1 编辑中、2 已发放、3 停止回收，初始化为 1
}
```

## 查看完整问卷

- 方法类类型：GET

- 请求 url：/api/paper/{paperId}/checkPaper

- RequestParam：

```ts
paperId: number // 问卷 Id
```

- ResponseBody：

```ts
{
  success: boolean, // 成功与否
  message: string,
  content: PaperDetial // 问卷完整信息
}
```

```ts
interface Option {
  id: number // 选项 Id
  questionId: number // 所属问题 Id
  content: string // 选项内容
}

interface Question {
  id: number // 题目 Id
  paperId: number // 所属问卷 Id
  type: number // 题目类型：1 单选、2 多选、3 简答
  title: string // 题目说明
  options: Option[] // 选项列表
}

interface PaperDetail {
  id: number // 问卷唯一标示
  userId: number // 所属用户
  title: string // 标题
  description: string // 说明
  start_time: Date // 开始发放时间
  end_time: Date // 结束发放时间
  status: boolean // 状态：1 编辑中、2 已发放、3 停止回收，初始化为 1
  questionList: Question[]
}
```

## 查看问卷统计信息

- 方法类类型：GET

- 请求 url：/api/paper/{paperId}/reviewPaper

- RequestParam：

```ts
paperId: number // 问卷 Id
```

- ResponseBody：

```ts
{
  success: boolean, // 成功与否
  message: string,
  content: PaperStatistic // 问卷属性和统计信息
}
```

```ts
interface OptionStatistic {
  id: number // 选项 Id
  questionId: number // 所属问题 Id
  content: string // 选项内容
  selectedNum: number // 选中数量
}

interface QuestionStatistic {
  id: number // 题目 Id
  paperId: number // 所属问卷 Id
  type: number // 题目类型：1 单选、2 多选、3 简答
  title: string // 题目说明
  selectedNum: number
  options: OptionStatistic[] // 选项统计列表
}

interface PaperStatistic {
  id: number // 问卷唯一标示
  userId: number // 所属用户
  title: string // 标题
  description: string // 说明
  start_time: Date // 开始发放时间
  end_time: Date // 结束发放时间
  status: boolean // 状态：1 编辑中、2 已发放、3 停止回收，初始化为 1
  questionList: QuestionStatistic[]
}
```

## 添加问卷

- 方法类类型：POST

- 请求 url：/api/paper/addPaper

- RequestBody：

```ts
{
  userId: number // 所属用户 Id
  title: string // 问卷名
  description: string // 问卷说明
}
```

- ResponseBody：

```ts
{
  success: boolean, // 成功与否
  message: string,
  content: Paper // 问卷属性和统计信息
}
```

```ts
interface Paper {
  id: number // 问卷唯一标示
  userId: number // 所属用户
  title: string // 标题
  description: string // 说明
  start_time: Date // 开始发放时间，初始化为空
  end_time: Date // 结束发放时间，初始化为空
  status: boolean // 状态：1 编辑中、2 已发放、3 停止回收，初始化为 1
}
```

## 修改问卷

- 方法类类型：POST

- 请求 url：/api/paper/updatePaper

- RequestBody：

```ts
{
  id: number // 问卷唯一标示
  userId: number // 所属用户
  title: string // 标题
  description: string // 说明
  start_time: Date // 开始发放时间
  end_time: Date // 结束发放时间
  status: boolean // 状态：1 编辑中、2 已发放、3 停止回收，初始化为 1
}
```

- ResponseBody：

```ts
{
  success: boolean, // 成功与否
  message: string,
  content: null | string
}
```

## 添加问题

- 方法类类型：GET

- 请求 url：/api/question/{paperId}/addQuestion

- RequestParam：

```ts
paperId: number // 问卷 Id
```

- ResponseBody：

```ts
{
  success: boolean, // 成功与否
  message: string,
  content: Question
}
```

```ts
interface Question {
  id: number // 题目 Id
  paperId: number // 所属问卷 Id
  type: number // 题目类型：1 单选、2 多选、3 简答
  title: string // 题目说明
  options: Option[] // 选项列表，初始化为空
}
```

## 删除问题

- 方法类类型：GET

- 请求 url：/api/question/{questionId}/deleteQuestion

- RequestParam：

```ts
paperId: number // 问卷 Id
```

- ResponseBody：

```ts
{
  success: boolean, // 成功与否
  message: string,
  content: null | string
}
```

## 更新问题

- 方法类类型：POST

- 请求 url：/api/question/updateQuestion

- RequestBody：

```ts
{
  id: number // 题目 Id
  paperId: number // 所属问卷 Id
  type: number // 题目类型：1 单选、2 多选、3 简答
  title: string // 题目说明
  options: Option[] // 选项列表
}
```

```ts
interface Option {
  id: number // 选项 Id
  questionId: number // 所属问题 Id
  content: string // 选项内容
}
```

- ResponseBody：

```ts
{
  success: boolean, // 成功与否
  message: string,
  content: null | string
}
```

## 填写问卷

- 方法类类型：POST

- 请求 url：/api/answer/addAnswers

- RequestBody：

```ts
{
  paperId: number,
  createTime: Date,
  answers: Answer[]
}
```

```ts
interface Answer {
  questionId: number // 题目 Id
  type: number // 题目类型：1 单选、2 多选、3 简答
  content: number | string // 回答，可以是 optionId 或是字符串回答
}
```

- ResponseBody：

```ts
{
  success: boolean, // 成功与否
  message: string,
  content: null | string
}
```
