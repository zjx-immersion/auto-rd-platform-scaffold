import type { SSTS } from './types'

/**
 * SSTS Mock数据
 */
export const ssts: SSTS[] = [
    // FEAT-001: 斜列泊车场景 的SSTS
    {
        id: 'SSTS-001',
        featureId: 'FEAT-001',
        name: '斜列车位识别',
        scenario: '系统需要识别30°-60°角度的斜列车位，包括车位线、车位角度、车位尺寸',
        techSpec: `
**输入**: 摄像头图像、超声波雷达数据
**输出**: 车位位置、角度、尺寸
**算法**: 车位线检测算法、角度计算算法
**性能**: 识别准确率≥98%，识别时间≤200ms
    `,
        acceptanceCriteria: `
- 支持30°-60°角度范围的斜列车位
- 车位识别准确率≥98%
- 识别时间≤200ms
- 支持不同光照条件
    `,
        version: 'V1.0',
        priority: 'P0',
        status: '已完成',
        reviewStatus: '已通过',
        owner: '张三',
        createdAt: '2026-01-21',
        updatedAt: '2026-01-28'
    },
    {
        id: 'SSTS-002',
        featureId: 'FEAT-001',
        name: '斜列泊车路径规划',
        scenario: '根据车位位置和角度，规划最优泊车路径',
        techSpec: `
**输入**: 车位信息、车辆当前位置
**输出**: 泊车路径点序列
**算法**: 混合A*路径规划算法
**性能**: 规划时间≤100ms
    `,
        acceptanceCriteria: `
- 路径规划成功率≥95%
- 规划时间≤100ms
- 路径平顺性评分≥8分
    `,
        version: 'V1.0',
        priority: 'P0',
        status: '已完成',
        reviewStatus: '已通过',
        owner: '李四',
        createdAt: '2026-01-21',
        updatedAt: '2026-01-28'
    },
    {
        id: 'SSTS-003',
        featureId: 'FEAT-001',
        name: '斜列泊车车辆控制',
        scenario: '按照规划路径控制车辆完成泊车',
        techSpec: `
**输入**: 泊车路径、实时车辆状态
**输出**: 方向盘转角、油门、刹车指令
**算法**: MPC模型预测控制
**性能**: 控制频率≥50Hz
    `,
        acceptanceCriteria: `
- 泊车成功率≥95%
- 泊车时间≤60秒
- 车辆控制平顺，无急刹急转
    `,
        version: 'V1.0',
        priority: 'P1',
        status: '设计中',
        reviewStatus: '评审中',
        owner: '王五',
        createdAt: '2026-01-21',
        updatedAt: '2026-01-28'
    },
    {
        id: 'SSTS-004',
        featureId: 'FEAT-001',
        name: '斜列泊车HMI提示',
        scenario: '向用户提供泊车过程中的状态和引导信息',
        techSpec: `
**输入**: 泊车状态、障碍物信息
**输出**: HMI显示内容、语音提示
**界面**: 3D车位可视化、进度条、文字提示
    `,
        acceptanceCriteria: `
- 提供清晰的泊车引导信息
- 实时显示泊车进度
- 障碍物预警及时准确
    `,
        version: 'V1.0',
        priority: 'P1',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '赵六',
        createdAt: '2026-01-21',
        updatedAt: '2026-01-28'
    },

    // FEAT-006: 弯道车道保持 的SSTS
    {
        id: 'SSTS-005',
        featureId: 'FEAT-006',
        name: '弯道车道线识别',
        scenario: '识别弯道场景下的车道线，计算弯道曲率',
        techSpec: `
**输入**: 摄像头图像
**输出**: 车道线位置、弯道曲率
**算法**: 深度学习车道线检测 + 曲线拟合
**性能**: 识别准确率≥95%
    `,
        acceptanceCriteria: `
- 支持曲率半径≥50m的弯道
- 车道线识别准确率≥95%
- 曲率计算误差≤5%
    `,
        version: 'V1.0',
        priority: 'P0',
        status: '已完成',
        reviewStatus: '已通过',
        owner: '钱七',
        createdAt: '2026-01-23',
        updatedAt: '2026-01-28'
    },
    {
        id: 'SSTS-006',
        featureId: 'FEAT-006',
        name: '弯道转向控制',
        scenario: '根据弯道曲率自动调整转向角度',
        techSpec: `
**输入**: 弯道曲率、车速、车道偏差
**输出**: 转向角度指令
**算法**: 前馈+反馈控制
**性能**: 控制频率≥50Hz
    `,
        acceptanceCriteria: `
- 车道保持偏差≤0.3m
- 转向平顺性评分≥8分
- 支持不同车速下的弯道保持
    `,
        version: 'V1.0',
        priority: 'P0',
        status: '已完成',
        reviewStatus: '已通过',
        owner: '孙八',
        createdAt: '2026-01-23',
        updatedAt: '2026-01-28'
    },

    // FEAT-008: 限速标志识别 的SSTS
    {
        id: 'SSTS-007',
        featureId: 'FEAT-008',
        name: '限速标志检测',
        scenario: '检测道路上的限速标志并识别限速值',
        techSpec: `
**输入**: 摄像头图像
**输出**: 限速标志位置、限速值
**算法**: YOLO目标检测 + OCR识别
**性能**: 检测准确率≥98%
    `,
        acceptanceCriteria: `
- 限速标志检测准确率≥98%
- 限速值识别准确率≥99%
- 检测距离≥100m
    `,
        version: 'V1.0',
        priority: 'P0',
        status: '已完成',
        reviewStatus: '已通过',
        owner: '周九',
        createdAt: '2026-01-25',
        updatedAt: '2026-01-28'
    },

    // FEAT-009: 斜列车位识别与泊入 的SSTS
    {
        id: 'SSTS-008',
        featureId: 'FEAT-009',
        name: '斜列车位识别-感知模块',
        scenario: '实现斜列车位的图像识别和超声波融合',
        techSpec: '**输入**: 摄像头+超声波数据\n**输出**: 车位位置、角度\n**算法**: 深度学习+传感器融合\n**性能**: 识别准确率≥98%',
        acceptanceCriteria: '- 识别准确率≥98%\n- 识别时间≤200ms\n- 支持30°-60°角度',
        version: 'V2.0',
        priority: 'P0',
        status: '设计中',
        reviewStatus: '评审中',
        owner: '张三',
        createdAt: '2026-01-28',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-009',
        featureId: 'FEAT-009',
        name: '斜列泊车路径规划',
        scenario: '规划斜列泊车的最优路径',
        techSpec: '**输入**: 车位信息、车辆状态\n**输出**: 泊车路径\n**算法**: 混合A*算法\n**性能**: 规划时间≤100ms',
        acceptanceCriteria: '- 规划成功率≥95%\n- 路径平顺性≥8分\n- 规划时间≤100ms',
        version: 'V2.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '李四',
        createdAt: '2026-01-28',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-010',
        featureId: 'FEAT-009',
        name: '斜列泊车控制执行',
        scenario: '执行斜列泊车的车辆控制',
        techSpec: '**输入**: 泊车路径\n**输出**: 控制指令\n**算法**: MPC控制\n**性能**: 控制频率≥50Hz',
        acceptanceCriteria: '- 泊车成功率≥95%\n- 泊车时间≤60秒\n- 控制平顺性≥8分',
        version: 'V2.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '王五',
        createdAt: '2026-01-28',
        updatedAt: '2026-02-01'
    },

    // FEAT-010: 记忆泊车功能 的SSTS
    {
        id: 'SSTS-011',
        featureId: 'FEAT-010',
        name: '泊车路线学习',
        scenario: '学习并记忆用户的泊车路线',
        techSpec: '**输入**: 泊车轨迹数据\n**输出**: 记忆路线\n**算法**: 轨迹学习算法\n**性能**: 学习准确率≥95%',
        acceptanceCriteria: '- 支持保存≥5条路线\n- 学习准确率≥95%\n- 存储时间≤5秒',
        version: 'V2.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '李四',
        createdAt: '2026-01-28',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-012',
        featureId: 'FEAT-010',
        name: '记忆场景识别',
        scenario: '识别当前场景是否匹配记忆路线',
        techSpec: '**输入**: 当前环境数据\n**输出**: 匹配的记忆路线\n**算法**: 场景匹配算法\n**性能**: 识别准确率≥90%',
        acceptanceCriteria: '- 场景识别准确率≥90%\n- 识别时间≤2秒\n- 支持环境变化',
        version: 'V2.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '张三',
        createdAt: '2026-01-28',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-013',
        featureId: 'FEAT-010',
        name: '记忆泊车执行',
        scenario: '按照记忆路线执行泊车',
        techSpec: '**输入**: 记忆路线\n**输出**: 控制指令\n**算法**: 轨迹跟踪控制\n**性能**: 跟踪精度≤0.2m',
        acceptanceCriteria: '- 记忆泊车成功率≥90%\n- 跟踪精度≤0.2m\n- 执行时间≤记忆时间+10秒',
        version: 'V2.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '王五',
        createdAt: '2026-01-28',
        updatedAt: '2026-02-01'
    },

    // FEAT-011: 多层停车场导航泊车 的SSTS
    {
        id: 'SSTS-014',
        featureId: 'FEAT-011',
        name: '停车场楼层识别',
        scenario: '识别停车场的楼层信息',
        techSpec: '**输入**: 摄像头+GPS数据\n**输出**: 楼层编号\n**算法**: 视觉识别+定位融合\n**性能**: 识别准确率≥95%',
        acceptanceCriteria: '- 楼层识别准确率≥95%\n- 支持≤5层停车场\n- 识别时间≤3秒',
        version: 'V2.0',
        priority: 'P1',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '王五',
        createdAt: '2026-01-28',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-015',
        featureId: 'FEAT-011',
        name: '楼层间路径规划',
        scenario: '规划跨楼层的导航路径',
        techSpec: '**输入**: 当前楼层、目标楼层\n**输出**: 导航路径\n**算法**: 多层路径规划\n**性能**: 规划时间≤5秒',
        acceptanceCriteria: '- 规划成功率≥90%\n- 路径最优性≥85%\n- 规划时间≤5秒',
        version: 'V2.0',
        priority: 'P1',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '李四',
        createdAt: '2026-01-28',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-016',
        featureId: 'FEAT-011',
        name: '空闲车位搜索',
        scenario: '搜索并推荐空闲车位',
        techSpec: '**输入**: 停车场地图\n**输出**: 空闲车位列表\n**算法**: 车位占用检测\n**性能**: 检测准确率≥90%',
        acceptanceCriteria: '- 空闲车位识别准确率≥90%\n- 搜索时间≤10秒\n- 推荐合理性≥8分',
        version: 'V2.0',
        priority: 'P1',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '张三',
        createdAt: '2026-01-28',
        updatedAt: '2026-02-01'
    },

    // FEAT-012: 自动变道功能 的SSTS
    {
        id: 'SSTS-017',
        featureId: 'FEAT-012',
        name: '变道时机判断',
        scenario: '判断是否适合变道',
        techSpec: '**输入**: 车道信息、周围车辆\n**输出**: 变道决策\n**算法**: 决策树算法\n**性能**: 决策时间≤100ms',
        acceptanceCriteria: '- 决策准确率≥95%\n- 决策时间≤100ms\n- 安全性评分≥9分',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '李四',
        createdAt: '2026-01-29',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-018',
        featureId: 'FEAT-012',
        name: '盲区检测',
        scenario: '检测盲区内的车辆',
        techSpec: '**输入**: 雷达+摄像头数据\n**输出**: 盲区车辆信息\n**算法**: 传感器融合\n**性能**: 检测准确率≥98%',
        acceptanceCriteria: '- 检测准确率≥98%\n- 检测距离≥50m\n- 检测延迟≤50ms',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '张三',
        createdAt: '2026-01-29',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-019',
        featureId: 'FEAT-012',
        name: '变道轨迹控制',
        scenario: '控制车辆平顺变道',
        techSpec: '**输入**: 变道路径\n**输出**: 控制指令\n**算法**: 轨迹跟踪控制\n**性能**: 控制频率≥50Hz',
        acceptanceCriteria: '- 变道成功率≥95%\n- 变道时间≤5秒\n- 平顺性评分≥8分',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '王五',
        createdAt: '2026-01-29',
        updatedAt: '2026-02-01'
    },

    // FEAT-013: 智能上下匝道 的SSTS
    {
        id: 'SSTS-020',
        featureId: 'FEAT-013',
        name: '匝道识别',
        scenario: '识别匝道入口和出口',
        techSpec: '**输入**: 地图+摄像头数据\n**输出**: 匝道位置信息\n**算法**: 地图匹配+视觉识别\n**性能**: 识别准确率≥98%',
        acceptanceCriteria: '- 识别准确率≥98%\n- 识别距离≥200m\n- 识别时间≤1秒',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '王五',
        createdAt: '2026-01-29',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-021',
        featureId: 'FEAT-013',
        name: '匝道速度规划',
        scenario: '规划匝道行驶速度',
        techSpec: '**输入**: 匝道曲率、车速\n**输出**: 目标速度\n**算法**: 速度规划算法\n**性能**: 规划时间≤100ms',
        acceptanceCriteria: '- 速度规划合理性≥8分\n- 规划时间≤100ms\n- 安全性评分≥9分',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '李四',
        createdAt: '2026-01-29',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-022',
        featureId: 'FEAT-013',
        name: '匝道行驶控制',
        scenario: '控制车辆平顺进出匝道',
        techSpec: '**输入**: 目标速度、路径\n**输出**: 控制指令\n**算法**: 纵横向联合控制\n**性能**: 控制频率≥50Hz',
        acceptanceCriteria: '- 成功率≥95%\n- 控制平顺性≥8分\n- 速度误差≤5km/h',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '王五',
        createdAt: '2026-01-29',
        updatedAt: '2026-02-01'
    },

    // FEAT-014: 多轮对话引擎 的SSTS
    {
        id: 'SSTS-023',
        featureId: 'FEAT-014',
        name: '上下文管理',
        scenario: '管理多轮对话的上下文信息',
        techSpec: '**输入**: 对话历史\n**输出**: 上下文状态\n**算法**: 上下文记忆网络\n**性能**: 记忆容量≥10轮',
        acceptanceCriteria: '- 支持≥5轮对话\n- 上下文准确率≥90%\n- 响应时间≤2秒',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '王五',
        createdAt: '2026-01-30',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-024',
        featureId: 'FEAT-014',
        name: '意图识别',
        scenario: '识别用户的对话意图',
        techSpec: '**输入**: 用户语音/文本\n**输出**: 意图类别\n**算法**: NLU模型\n**性能**: 识别准确率≥90%',
        acceptanceCriteria: '- 意图识别准确率≥90%\n- 支持≥50种意图\n- 识别时间≤1秒',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '赵六',
        createdAt: '2026-01-30',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-025',
        featureId: 'FEAT-014',
        name: '对话生成',
        scenario: '生成自然的对话回复',
        techSpec: '**输入**: 意图+上下文\n**输出**: 回复文本\n**算法**: NLG模型\n**性能**: 生成时间≤2秒',
        acceptanceCriteria: '- 回复自然度≥8分\n- 生成时间≤2秒\n- 准确性≥90%',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '钱七',
        createdAt: '2026-01-30',
        updatedAt: '2026-02-01'
    },

    // FEAT-015: 场景理解与推荐 的SSTS
    {
        id: 'SSTS-026',
        featureId: 'FEAT-015',
        name: '场景识别',
        scenario: '识别用户当前的使用场景',
        techSpec: '**输入**: 时间、位置、行为数据\n**输出**: 场景类别\n**算法**: 场景分类模型\n**性能**: 识别准确率≥85%',
        acceptanceCriteria: '- 场景识别准确率≥85%\n- 支持≥20种场景\n- 识别时间≤3秒',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '赵六',
        createdAt: '2026-01-30',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-027',
        featureId: 'FEAT-015',
        name: '用户偏好分析',
        scenario: '分析用户的使用偏好',
        techSpec: '**输入**: 用户行为历史\n**输出**: 偏好模型\n**算法**: 协同过滤\n**性能**: 分析准确率≥80%',
        acceptanceCriteria: '- 偏好分析准确率≥80%\n- 更新周期≤1天\n- 模型收敛时间≤1周',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '钱七',
        createdAt: '2026-01-30',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-028',
        featureId: 'FEAT-015',
        name: '智能推荐',
        scenario: '推荐个性化服务',
        techSpec: '**输入**: 场景+偏好\n**输出**: 推荐列表\n**算法**: 推荐系统\n**性能**: 推荐准确率≥70%',
        acceptanceCriteria: '- 推荐接受率≥60%\n- 推荐时间≤3秒\n- 推荐多样性≥0.7',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '赵六',
        createdAt: '2026-01-30',
        updatedAt: '2026-02-01'
    },

    // FEAT-016: 情感识别与反馈 的SSTS
    {
        id: 'SSTS-029',
        featureId: 'FEAT-016',
        name: '语音情感识别',
        scenario: '识别用户语音中的情感',
        techSpec: '**输入**: 语音数据\n**输出**: 情感类别\n**算法**: 情感识别模型\n**性能**: 识别准确率≥80%',
        acceptanceCriteria: '- 情感识别准确率≥80%\n- 支持≥5种情感\n- 识别时间≤2秒',
        version: 'V1.0',
        priority: 'P1',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '钱七',
        createdAt: '2026-01-30',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-030',
        featureId: 'FEAT-016',
        name: '表情识别',
        scenario: '识别用户的面部表情',
        techSpec: '**输入**: 摄像头图像\n**输出**: 表情类别\n**算法**: 表情识别模型\n**性能**: 识别准确率≥75%',
        acceptanceCriteria: '- 表情识别准确率≥75%\n- 支持≥7种表情\n- 识别时间≤1秒',
        version: 'V1.0',
        priority: 'P1',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '王五',
        createdAt: '2026-01-30',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-031',
        featureId: 'FEAT-016',
        name: '情感化反馈',
        scenario: '生成情感化的语音反馈',
        techSpec: '**输入**: 情感类别\n**输出**: 情感化语音\n**算法**: 情感TTS\n**性能**: 生成时间≤2秒',
        acceptanceCriteria: '- 反馈自然度≥7分\n- 情感匹配度≥80%\n- 生成时间≤2秒',
        version: 'V1.0',
        priority: 'P1',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '赵六',
        createdAt: '2026-01-30',
        updatedAt: '2026-02-01'
    },

    // FEAT-017: 氛围灯智能联动 的SSTS
    {
        id: 'SSTS-032',
        featureId: 'FEAT-017',
        name: '场景联动控制',
        scenario: '根据驾驶场景控制氛围灯',
        techSpec: '**输入**: 驾驶场景\n**输出**: 灯光控制指令\n**算法**: 场景映射规则\n**性能**: 响应时间≤500ms',
        acceptanceCriteria: '- 支持≥10种场景\n- 响应时间≤500ms\n- 联动准确率≥95%',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '赵六',
        createdAt: '2026-01-31',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-033',
        featureId: 'FEAT-017',
        name: '音乐节奏联动',
        scenario: '氛围灯随音乐节奏变化',
        techSpec: '**输入**: 音乐节奏数据\n**输出**: 灯光变化指令\n**算法**: 节奏检测+灯效生成\n**性能**: 延迟≤100ms',
        acceptanceCriteria: '- 节奏匹配度≥85%\n- 延迟≤100ms\n- 效果自然度≥8分',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '钱七',
        createdAt: '2026-01-31',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-034',
        featureId: 'FEAT-017',
        name: '语音交互联动',
        scenario: '语音交互时的氛围灯反馈',
        techSpec: '**输入**: 语音交互状态\n**输出**: 灯光反馈效果\n**算法**: 状态机控制\n**性能**: 响应时间≤200ms',
        acceptanceCriteria: '- 响应时间≤200ms\n- 反馈准确率≥90%\n- 效果协调性≥8分',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '赵六',
        createdAt: '2026-01-31',
        updatedAt: '2026-02-01'
    },

    // FEAT-018: 多感官体验系统 的SSTS
    {
        id: 'SSTS-035',
        featureId: 'FEAT-018',
        name: '视听联动控制',
        scenario: '氛围灯与音效的联动控制',
        techSpec: '**输入**: 场景模式\n**输出**: 灯光+音效指令\n**算法**: 多模态联动控制\n**性能**: 联动延迟≤500ms',
        acceptanceCriteria: '- 联动延迟≤500ms\n- 协调性≥8分\n- 支持≥5种模式',
        version: 'V1.0',
        priority: 'P1',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '钱七',
        createdAt: '2026-01-31',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-036',
        featureId: 'FEAT-018',
        name: '触觉嗅觉联动',
        scenario: '座椅按摩与香氛系统联动',
        techSpec: '**输入**: 体验模式\n**输出**: 按摩+香氛控制指令\n**算法**: 模式映射控制\n**性能**: 响应时间≤1秒',
        acceptanceCriteria: '- 响应时间≤1秒\n- 联动准确率≥90%\n- 体验舒适度≥8分',
        version: 'V1.0',
        priority: 'P1',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '赵六',
        createdAt: '2026-01-31',
        updatedAt: '2026-02-01'
    },
    {
        id: 'SSTS-037',
        featureId: 'FEAT-018',
        name: '场景化体验编排',
        scenario: '编排完整的多感官体验场景',
        techSpec: '**输入**: 场景选择\n**输出**: 全感官控制序列\n**算法**: 体验编排引擎\n**性能**: 启动时间≤2秒',
        acceptanceCriteria: '- 支持≥5种体验模式\n- 启动时间≤2秒\n- 用户满意度≥8分',
        version: 'V1.0',
        priority: 'P1',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '钱七',
        createdAt: '2026-01-31',
        updatedAt: '2026-02-01'
    },
    // L2-J6M产品线 SSTS数据 (FEAT-019 ~ FEAT-024)
    // FEAT-019: 高速自动跟车
    {
        id: 'SSTS-038',
        featureId: 'FEAT-019',
        name: '高速自动跟车-场景定义与需求分析',
        scenario: '在高速公路场景下，车辆需要能够自动跟随前车行驶，保持安全车距',
        techSpec: `
**输入**: 前向摄像头、毫米波雷达数据
**输出**: 纵向加速度控制指令
**算法**: 自适应巡航控制算法(ACC)
**性能**: 响应时间≤50ms，跟车精度±0.5m
        `,
        acceptanceCriteria: `
- 支持0-130km/h全速域跟车
- 跟车距离可调(1-3秒)
- 平顺性评分≥9分
        `,
        version: 'V1.0',
        priority: 'P0',
        status: '已完成',
        reviewStatus: '已通过',
        owner: '张伟',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'SSTS-039',
        featureId: 'FEAT-019',
        name: '高速自动跟车-技术方案与架构设计',
        scenario: '设计自动跟车的软件架构和控制算法',
        techSpec: `
**架构**: 感知层、决策层、控制层三层架构
**算法**: PID控制算法 + MPC预测控制
**接口**: CAN总线通信协议
        `,
        acceptanceCriteria: `
- 架构设计评审通过
- 算法仿真验证通过
- 接口设计符合规范
        `,
        version: 'V1.0',
        priority: 'P0',
        status: '开发中',
        reviewStatus: '评审中',
        owner: '张伟',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'SSTS-040',
        featureId: 'FEAT-019',
        name: '高速自动跟车-测试验收标准',
        scenario: '定义自动跟车功能的测试用例和验收标准',
        techSpec: `
**测试场景**: 直道跟车、弯道跟车、加减速跟车
**测试方法**: 实车测试 + 仿真测试
**验收指标**: 功能完整性、性能指标、安全性
        `,
        acceptanceCriteria: `
- 测试用例覆盖率≥95%
- 所有测试用例通过
- 安全性评估通过
        `,
        version: 'V1.0',
        priority: 'P0',
        status: '设计中',
        reviewStatus: '草稿',
        owner: '张伟',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    // FEAT-020: 自动变道辅助
    {
        id: 'SSTS-041',
        featureId: 'FEAT-020',
        name: '自动变道辅助-场景定义与需求分析',
        scenario: '在高速公路场景下，系统自动判断变道时机并执行变道操作',
        techSpec: `
**输入**: 多传感器融合数据(摄像头、雷达、地图)
**输出**: 横向控制指令
**算法**: 变道决策算法 + 轨迹规划算法
**性能**: 决策时间≤100ms，变道成功率≥98%
        `,
        acceptanceCriteria: `
- 支持左右变道
- 变道平顺性评分≥8分
- 安全性验证通过
        `,
        version: 'V1.0',
        priority: 'P0',
        status: '已完成',
        reviewStatus: '已通过',
        owner: '王芳',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'SSTS-042',
        featureId: 'FEAT-020',
        name: '自动变道辅助-技术方案与架构设计',
        scenario: '设计自动变道的决策逻辑和控制策略',
        techSpec: `
**决策逻辑**: 基于规则的决策树 + 机器学习模型
**控制策略**: 轨迹跟踪控制 + 横向稳定性控制
**安全机制**: 碰撞风险评估 + 紧急制动
        `,
        acceptanceCriteria: `
- 决策逻辑评审通过
- 控制策略仿真验证通过
- 安全机制测试通过
        `,
        version: 'V1.0',
        priority: 'P0',
        status: '开发中',
        reviewStatus: '评审中',
        owner: '王芳',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'SSTS-043',
        featureId: 'FEAT-020',
        name: '自动变道辅助-测试验收标准',
        scenario: '定义自动变道功能的测试用例和验收标准',
        techSpec: `
**测试场景**: 正常变道、紧急避让、拥堵变道
**测试方法**: 封闭场地测试 + 实际道路测试
**验收指标**: 成功率、平顺性、安全性
        `,
        acceptanceCriteria: `
- 测试用例覆盖率≥90%
- 变道成功率≥98%
- 无安全事故
        `,
        version: 'V1.0',
        priority: 'P0',
        status: '设计中',
        reviewStatus: '草稿',
        owner: '王芳',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    // FEAT-021: 智能限速识别
    {
        id: 'SSTS-044',
        featureId: 'FEAT-021',
        name: '智能限速识别-场景定义与需求分析',
        scenario: '通过摄像头识别道路限速标志，并与地图数据融合',
        techSpec: `
**输入**: 前向摄像头图像、高精地图数据
**输出**: 当前道路限速值
**算法**: 交通标志识别算法 + 地图匹配算法
**性能**: 识别准确率≥99%，识别距离≥100m
        `,
        acceptanceCriteria: `
- 支持各类限速标志识别
- 识别准确率≥99%
- 地图融合准确率≥95%
        `,
        version: 'V1.0',
        priority: 'P1',
        status: '已完成',
        reviewStatus: '已通过',
        owner: '刘强',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'SSTS-045',
        featureId: 'FEAT-021',
        name: '智能限速识别-技术方案与架构设计',
        scenario: '设计限速识别的算法架构和数据融合策略',
        techSpec: `
**算法架构**: CNN深度学习模型 + 后处理逻辑
**数据融合**: 视觉识别 + 地图数据 + 历史数据
**容错机制**: 多帧融合 + 置信度评估
        `,
        acceptanceCriteria: `
- 算法模型评审通过
- 融合策略验证通过
- 容错机制测试通过
        `,
        version: 'V1.0',
        priority: 'P1',
        status: '开发中',
        reviewStatus: '评审中',
        owner: '刘强',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'SSTS-046',
        featureId: 'FEAT-021',
        name: '智能限速识别-测试验收标准',
        scenario: '定义限速识别功能的测试用例和验收标准',
        techSpec: `
**测试场景**: 晴天、雨天、夜间、逆光等各种光照条件
**测试方法**: 实车采集数据 + 离线测试
**验收指标**: 准确率、召回率、误报率
        `,
        acceptanceCriteria: `
- 测试数据量≥10000张
- 准确率≥99%
- 误报率≤0.1%
        `,
        version: 'V1.0',
        priority: 'P1',
        status: '设计中',
        reviewStatus: '草稿',
        owner: '刘强',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    // FEAT-022: 自动泊车入位
    {
        id: 'SSTS-047',
        featureId: 'FEAT-022',
        name: '自动泊车入位-场景定义与需求分析',
        scenario: '支持垂直、水平、斜列三种泊车场景的自动泊车入位',
        techSpec: `
**输入**: 环视摄像头、超声波雷达数据
**输出**: 方向盘转角、油门刹车控制指令
**算法**: 车位检测 + 路径规划 + 轨迹跟踪
**性能**: 泊车成功率≥95%，泊车时间≤60s
        `,
        acceptanceCriteria: `
- 支持三种泊车场景
- 泊车成功率≥95%
- 车位居中度≥90%
        `,
        version: 'V1.0',
        priority: 'P0',
        status: '已完成',
        reviewStatus: '已通过',
        owner: '赵敏',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'SSTS-048',
        featureId: 'FEAT-022',
        name: '自动泊车入位-技术方案与架构设计',
        scenario: '设计自动泊车的感知、规划、控制架构',
        techSpec: `
**感知模块**: 车位检测算法 + 障碍物检测
**规划模块**: 混合A*路径规划 + 轨迹优化
**控制模块**: 纯跟踪控制 + PID控制
        `,
        acceptanceCriteria: `
- 各模块设计评审通过
- 模块间接口定义清晰
- 仿真测试通过
        `,
        version: 'V1.0',
        priority: 'P0',
        status: '开发中',
        reviewStatus: '评审中',
        owner: '赵敏',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'SSTS-049',
        featureId: 'FEAT-022',
        name: '自动泊车入位-测试验收标准',
        scenario: '定义自动泊车功能的测试用例和验收标准',
        techSpec: `
**测试场景**: 标准车位、窄车位、斜坡车位
**测试方法**: 实车测试 + 场景仿真
**验收指标**: 成功率、时间、精度
        `,
        acceptanceCriteria: `
- 测试用例覆盖率≥95%
- 泊车成功率≥95%
- 无碰撞事故
        `,
        version: 'V1.0',
        priority: 'P0',
        status: '设计中',
        reviewStatus: '草稿',
        owner: '赵敏',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    // FEAT-023: 记忆泊车
    {
        id: 'SSTS-050',
        featureId: 'FEAT-023',
        name: '记忆泊车-场景定义与需求分析',
        scenario: '车辆能够记忆固定车位的泊车路径，实现自动泊车',
        techSpec: `
**输入**: GPS定位、视觉SLAM、车位特征
**输出**: 泊车路径、控制指令
**算法**: 路径记忆 + 路径回放 + 实时定位
**性能**: 定位精度≤10cm，成功率≥90%
        `,
        acceptanceCriteria: `
- 支持路径记忆和回放
- 定位精度≤10cm
- 泊车成功率≥90%
        `,
        version: 'V1.0',
        priority: 'P1',
        status: '已完成',
        reviewStatus: '已通过',
        owner: '孙丽',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'SSTS-051',
        featureId: 'FEAT-023',
        name: '记忆泊车-技术方案与架构设计',
        scenario: '设计记忆泊车的定位、建图、路径规划架构',
        techSpec: `
**定位模块**: GPS + IMU + 视觉SLAM融合定位
**建图模块**: 特征点地图 + 语义地图
**规划模块**: 路径记忆 + 路径优化 + 动态避障
        `,
        acceptanceCriteria: `
- 定位精度满足要求
- 地图构建稳定可靠
- 路径规划合理
        `,
        version: 'V1.0',
        priority: 'P1',
        status: '开发中',
        reviewStatus: '评审中',
        owner: '孙丽',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'SSTS-052',
        featureId: 'FEAT-023',
        name: '记忆泊车-测试验收标准',
        scenario: '定义记忆泊车功能的测试用例和验收标准',
        techSpec: `
**测试场景**: 地下车库、露天停车场、不同光照条件
**测试方法**: 重复测试 + 长期稳定性测试
**验收指标**: 成功率、定位精度、稳定性
        `,
        acceptanceCriteria: `
- 重复测试100次成功率≥90%
- 定位精度≤10cm
- 长期使用稳定
        `,
        version: 'V1.0',
        priority: 'P1',
        status: '设计中',
        reviewStatus: '草稿',
        owner: '孙丽',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    // FEAT-024: 遥控泊车
    {
        id: 'SSTS-053',
        featureId: 'FEAT-024',
        name: '遥控泊车-场景定义与需求分析',
        scenario: '用户在车外通过手机APP遥控车辆自动泊车',
        techSpec: `
**输入**: 手机APP指令、环视摄像头、超声波雷达
**输出**: 车辆控制指令
**算法**: 遥控通信 + 自动泊车 + 安全监控
**性能**: 通信延迟≤100ms，控制距离≥10m
        `,
        acceptanceCriteria: `
- 支持手机遥控
- 通信稳定可靠
- 安全机制完善
        `,
        version: 'V1.0',
        priority: 'P1',
        status: '已完成',
        reviewStatus: '已通过',
        owner: '周杰',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'SSTS-054',
        featureId: 'FEAT-024',
        name: '遥控泊车-技术方案与架构设计',
        scenario: '设计遥控泊车的通信、控制、安全架构',
        techSpec: `
**通信模块**: 蓝牙/WiFi通信 + 加密协议
**控制模块**: 远程控制 + 本地安全监控
**安全模块**: 障碍物检测 + 紧急停车 + 超时保护
        `,
        acceptanceCriteria: `
- 通信协议设计合理
- 控制逻辑安全可靠
- 安全机制完善
        `,
        version: 'V1.0',
        priority: 'P1',
        status: '开发中',
        reviewStatus: '评审中',
        owner: '周杰',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'SSTS-055',
        featureId: 'FEAT-024',
        name: '遥控泊车-测试验收标准',
        scenario: '定义遥控泊车功能的测试用例和验收标准',
        techSpec: `
**测试场景**: 不同距离、不同障碍物、通信干扰
**测试方法**: 实车测试 + 通信测试 + 安全测试
**验收指标**: 成功率、安全性、用户体验
        `,
        acceptanceCriteria: `
- 测试用例覆盖率≥95%
- 泊车成功率≥90%
- 安全测试全部通过
        `,
        version: 'V1.0',
        priority: 'P1',
        status: '设计中',
        reviewStatus: '草稿',
        owner: '周杰',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
]

export const getSSTSById = (id: string): SSTS | undefined => {
    return ssts.find(s => s.id === id)
}

export const getSSTSByFeatureId = (featureId: string): SSTS[] => {
    return ssts.filter(s => s.featureId === featureId)
}

export const getSSTSByReviewStatus = (reviewStatus: SSTS['reviewStatus']): SSTS[] => {
    return ssts.filter(s => s.reviewStatus === reviewStatus)
}

export const createSSTSBatch = (featureId: string, names: string[]): SSTS[] => {
    const newSSTSList: SSTS[] = names.map((name, index) => ({
        id: `SSTS-${String(ssts.length + index + 1).padStart(3, '0')}`,
        featureId,
        name,
        scenario: '请填写场景描述...',
        techSpec: '请填写技术规格...',
        acceptanceCriteria: '请填写验收标准...',
        version: 'V1.0',
        priority: 'P1',
        status: '草稿',
        reviewStatus: '草稿',
        owner: '待分配',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
    }))

    ssts.push(...newSSTSList)
    return newSSTSList
}
