import type { MR } from './types'

/**
 * MR (Module Requirement) Mock数据
 */
export const mrs: MR[] = [
    // SSTS-001: 斜列车位识别 的MR
    {
        id: 'MR-001',
        sstsId: 'SSTS-001',
        moduleId: 'MOD-001', // 感知模块
        name: '斜列车位识别-感知模块',
        description: '实现斜列车位的图像识别和超声波融合',
        effort: 8,
        status: '已分配',
        iterationId: 'ITER-001',
        createdAt: '2026-01-22',
        updatedAt: '2026-01-28'
    },
    {
        id: 'MR-002',
        sstsId: 'SSTS-001',
        moduleId: 'MOD-004', // HMI模块
        name: '斜列车位识别-HMI显示',
        description: '在HMI上显示识别到的斜列车位',
        effort: 3,
        status: '已分配',
        iterationId: 'ITER-004',
        createdAt: '2026-01-22',
        updatedAt: '2026-01-28'
    },

    // SSTS-002: 斜列泊车路径规划 的MR
    {
        id: 'MR-003',
        sstsId: 'SSTS-002',
        moduleId: 'MOD-002', // 规划模块
        name: '斜列泊车路径规划算法',
        description: '实现混合A*路径规划算法',
        effort: 10,
        status: '已分配',
        iterationId: 'ITER-002',
        createdAt: '2026-01-22',
        updatedAt: '2026-01-28'
    },

    // SSTS-003: 斜列泊车车辆控制 的MR
    {
        id: 'MR-004',
        sstsId: 'SSTS-003',
        moduleId: 'MOD-003', // 控制模块
        name: '斜列泊车MPC控制器',
        description: '实现MPC模型预测控制器',
        effort: 12,
        status: '已分配',
        iterationId: 'ITER-003',
        createdAt: '2026-01-22',
        updatedAt: '2026-01-28'
    },

    // SSTS-004: 斜列泊车HMI提示 的MR
    {
        id: 'MR-005',
        sstsId: 'SSTS-004',
        moduleId: 'MOD-004', // HMI模块
        name: '斜列泊车HMI界面',
        description: '实现3D车位可视化和泊车引导界面',
        effort: 8,
        status: '待分配',
        createdAt: '2026-01-22',
        updatedAt: '2026-01-28'
    },

    // SSTS-005: 弯道车道线识别 的MR
    {
        id: 'MR-006',
        sstsId: 'SSTS-005',
        moduleId: 'MOD-001', // 感知模块
        name: '弯道车道线识别算法',
        description: '实现深度学习车道线检测和曲线拟合',
        effort: 10,
        status: '已分配',
        iterationId: 'ITER-001',
        createdAt: '2026-01-24',
        updatedAt: '2026-01-28'
    },

    // SSTS-006: 弯道转向控制 的MR
    {
        id: 'MR-007',
        sstsId: 'SSTS-006',
        moduleId: 'MOD-003', // 控制模块
        name: '弯道转向控制算法',
        description: '实现前馈+反馈转向控制',
        effort: 8,
        status: '已分配',
        iterationId: 'ITER-003',
        createdAt: '2026-01-24',
        updatedAt: '2026-01-28'
    },

    // SSTS-007: 限速标志检测 的MR
    {
        id: 'MR-008',
        sstsId: 'SSTS-007',
        moduleId: 'MOD-001', // 感知模块
        name: '限速标志检测识别',
        description: '实现YOLO目标检测和OCR识别',
        effort: 12,
        status: '待分配',
        createdAt: '2026-01-26',
        updatedAt: '2026-01-28'
    },
    {
        id: 'MR-009',
        sstsId: 'SSTS-007',
        moduleId: 'MOD-004', // HMI模块
        name: '限速标志HMI显示',
        description: '在HMI上显示识别到的限速标志',
        effort: 4,
        status: '待分配',
        createdAt: '2026-01-26',
        updatedAt: '2026-01-28'
    },

    // 新增MR数据 - FEAT-009: 斜列车位识别与泊入
    {
        id: 'MR-010',
        sstsId: 'SSTS-008',
        moduleId: 'MOD-001',
        name: '斜列车位识别-感知算法',
        description: '实现斜列车位的深度学习识别算法',
        effort: 10,
        status: '待分配',
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'MR-011',
        sstsId: 'SSTS-008',
        moduleId: 'MOD-002',
        name: '斜列车位识别-数据融合',
        description: '实现超声波和视觉数据融合',
        effort: 8,
        status: '待分配',
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'MR-012',
        sstsId: 'SSTS-009',
        moduleId: 'MOD-002',
        name: '斜列泊车路径规划-算法实现',
        description: '实现混合A*路径规划算法',
        effort: 12,
        status: '待分配',
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'MR-013',
        sstsId: 'SSTS-010',
        moduleId: 'MOD-003',
        name: '斜列泊车控制-MPC控制器',
        description: '实现MPC模型预测控制器',
        effort: 15,
        status: '待分配',
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },

    // FEAT-010: 记忆泊车功能
    {
        id: 'MR-014',
        sstsId: 'SSTS-011',
        moduleId: 'MOD-002',
        name: '泊车路线学习-轨迹记录',
        description: '实现泊车轨迹学习和存储',
        effort: 10,
        status: '已分配',
        iterationId: 'ITER-018',
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'MR-015',
        sstsId: 'SSTS-012',
        moduleId: 'MOD-001',
        name: '记忆场景识别-场景匹配',
        description: '实现场景识别和匹配算法',
        effort: 9,
        status: '已分配',
        iterationId: 'ITER-017',
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'MR-016',
        sstsId: 'SSTS-013',
        moduleId: 'MOD-003',
        name: '记忆泊车执行-轨迹跟踪',
        description: '实现轨迹跟踪控制',
        effort: 11,
        status: '已分配',
        iterationId: 'ITER-019',
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },

    // FEAT-012: 自动变道功能
    {
        id: 'MR-017',
        sstsId: 'SSTS-017',
        moduleId: 'MOD-002',
        name: '变道时机判断-决策算法',
        description: '实现变道决策树算法',
        effort: 8,
        status: '已分配',
        iterationId: 'ITER-018',
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'MR-018',
        sstsId: 'SSTS-018',
        moduleId: 'MOD-001',
        name: '盲区检测-传感器融合',
        description: '实现雷达和摄像头融合检测',
        effort: 10,
        status: '已分配',
        iterationId: 'ITER-017',
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'MR-019',
        sstsId: 'SSTS-019',
        moduleId: 'MOD-003',
        name: '变道轨迹控制-轨迹跟踪',
        description: '实现变道轨迹跟踪控制',
        effort: 9,
        status: '已分配',
        iterationId: 'ITER-019',
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },

    // FEAT-014: 多轮对话引擎
    {
        id: 'MR-020',
        sstsId: 'SSTS-023',
        moduleId: 'MOD-004',
        name: '上下文管理-记忆网络',
        description: '实现上下文记忆网络',
        effort: 12,
        status: '待分配',
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'MR-021',
        sstsId: 'SSTS-024',
        moduleId: 'MOD-004',
        name: '意图识别-NLU模型',
        description: '实现自然语言理解模型',
        effort: 15,
        status: '待分配',
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'MR-022',
        sstsId: 'SSTS-025',
        moduleId: 'MOD-004',
        name: '对话生成-NLG模型',
        description: '实现自然语言生成模型',
        effort: 13,
        status: '待分配',
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },

    // FEAT-017: 氛围灯智能联动
    {
        id: 'MR-023',
        sstsId: 'SSTS-032',
        moduleId: 'MOD-004',
        name: '场景联动控制-规则引擎',
        description: '实现场景映射规则引擎',
        effort: 7,
        status: '待分配',
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'MR-024',
        sstsId: 'SSTS-033',
        moduleId: 'MOD-004',
        name: '音乐节奏联动-节奏检测',
        description: '实现音乐节奏检测算法',
        effort: 8,
        status: '待分配',
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'MR-025',
        sstsId: 'SSTS-034',
        moduleId: 'MOD-004',
        name: '语音交互联动-状态机',
        description: '实现语音交互状态机控制',
        effort: 6,
        status: '待分配',
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },

    // L2-J6M产品线 MR数据 (SSTS-038 ~ SSTS-055, 每个SSTS 2个MR)
    // SSTS-038的MR
    {
        id: 'MR-026',
        sstsId: 'SSTS-038',
        name: '高速自动跟车-场景定义-前端实现',
        description: '实现高速自动跟车场景定义的前端展示和交互',
        author: '张伟',
        reviewer: '技术负责人',
        status: '已合并',
        priority: 'P0',
        createdAt: '2026-02-03',
        updatedAt: '2026-02-04'
    },
    {
        id: 'MR-027',
        sstsId: 'SSTS-038',
        name: '高速自动跟车-场景定义-算法实现',
        description: '实现高速自动跟车的ACC算法',
        author: '张伟',
        reviewer: '算法专家',
        status: '已合并',
        priority: 'P0',
        createdAt: '2026-02-03',
        updatedAt: '2026-02-05'
    },
    // SSTS-039的MR
    {
        id: 'MR-028',
        sstsId: 'SSTS-039',
        name: '高速自动跟车-架构设计-控制模块',
        description: '实现自动跟车的控制模块',
        author: '张伟',
        reviewer: '架构师',
        status: '待审核',
        priority: 'P0',
        createdAt: '2026-02-05',
        updatedAt: '2026-02-05'
    },
    {
        id: 'MR-029',
        sstsId: 'SSTS-039',
        name: '高速自动跟车-架构设计-接口定义',
        description: '定义自动跟车的CAN总线接口',
        author: '张伟',
        reviewer: '待分配',
        status: '待审核',
        priority: 'P0',
        createdAt: '2026-02-05',
        updatedAt: '2026-02-05'
    },
    // SSTS-040的MR
    {
        id: 'MR-030',
        sstsId: 'SSTS-040',
        name: '高速自动跟车-测试用例设计',
        description: '设计自动跟车的测试用例',
        author: '张伟',
        reviewer: '测试负责人',
        status: '待审核',
        priority: 'P0',
        createdAt: '2026-02-06',
        updatedAt: '2026-02-06'
    },
    {
        id: 'MR-031',
        sstsId: 'SSTS-040',
        name: '高速自动跟车-自动化测试脚本',
        description: '实现自动跟车的自动化测试脚本',
        author: '张伟',
        reviewer: '待分配',
        status: '待审核',
        priority: 'P0',
        createdAt: '2026-02-06',
        updatedAt: '2026-02-06'
    },
    // SSTS-041的MR
    {
        id: 'MR-032',
        sstsId: 'SSTS-041',
        name: '自动变道辅助-场景分析-决策逻辑',
        description: '实现自动变道的决策逻辑',
        author: '王芳',
        reviewer: '技术负责人',
        status: '已合并',
        priority: 'P0',
        createdAt: '2026-02-04',
        updatedAt: '2026-02-06'
    },
    {
        id: 'MR-033',
        sstsId: 'SSTS-041',
        name: '自动变道辅助-场景分析-安全评估',
        description: '实现变道安全性评估模块',
        author: '王芳',
        reviewer: '安全专家',
        status: '已合并',
        priority: 'P0',
        createdAt: '2026-02-04',
        updatedAt: '2026-02-07'
    },
    // SSTS-042的MR
    {
        id: 'MR-034',
        sstsId: 'SSTS-042',
        name: '自动变道辅助-轨迹规划算法',
        description: '实现变道轨迹规划算法',
        author: '王芳',
        reviewer: '算法专家',
        status: '待审核',
        priority: 'P0',
        createdAt: '2026-02-07',
        updatedAt: '2026-02-07'
    },
    {
        id: 'MR-035',
        sstsId: 'SSTS-042',
        name: '自动变道辅助-控制策略实现',
        description: '实现变道控制策略',
        author: '王芳',
        reviewer: '待分配',
        status: '待审核',
        priority: 'P0',
        createdAt: '2026-02-07',
        updatedAt: '2026-02-07'
    },
    // SSTS-043的MR
    {
        id: 'MR-036',
        sstsId: 'SSTS-043',
        name: '自动变道辅助-测试场景设计',
        description: '设计变道测试场景',
        author: '王芳',
        reviewer: '测试负责人',
        status: '待审核',
        priority: 'P0',
        createdAt: '2026-02-08',
        updatedAt: '2026-02-08'
    },
    {
        id: 'MR-037',
        sstsId: 'SSTS-043',
        name: '自动变道辅助-性能测试',
        description: '实现变道性能测试',
        author: '王芳',
        reviewer: '待分配',
        status: '待审核',
        priority: 'P0',
        createdAt: '2026-02-08',
        updatedAt: '2026-02-08'
    },
    // SSTS-044的MR
    {
        id: 'MR-038',
        sstsId: 'SSTS-044',
        name: '智能限速识别-标志识别模型',
        description: '实现交通标志识别深度学习模型',
        author: '刘强',
        reviewer: '算法专家',
        status: '已合并',
        priority: 'P1',
        createdAt: '2026-02-05',
        updatedAt: '2026-02-08'
    },
    {
        id: 'MR-039',
        sstsId: 'SSTS-044',
        name: '智能限速识别-地图融合逻辑',
        description: '实现限速标志与地图数据融合',
        author: '刘强',
        reviewer: '技术负责人',
        status: '已合并',
        priority: 'P1',
        createdAt: '2026-02-05',
        updatedAt: '2026-02-09'
    },
    // SSTS-045的MR
    {
        id: 'MR-040',
        sstsId: 'SSTS-045',
        name: '智能限速识别-模型训练pipeline',
        description: '搭建模型训练和优化pipeline',
        author: '刘强',
        reviewer: '算法专家',
        status: '待审核',
        priority: 'P1',
        createdAt: '2026-02-09',
        updatedAt: '2026-02-09'
    },
    {
        id: 'MR-041',
        sstsId: 'SSTS-045',
        name: '智能限速识别-后处理优化',
        description: '优化识别结果后处理逻辑',
        author: '刘强',
        reviewer: '待分配',
        status: '待审核',
        priority: 'P1',
        createdAt: '2026-02-09',
        updatedAt: '2026-02-09'
    },
    // SSTS-046的MR
    {
        id: 'MR-042',
        sstsId: 'SSTS-046',
        name: '智能限速识别-测试数据集构建',
        description: '构建限速识别测试数据集',
        author: '刘强',
        reviewer: '测试负责人',
        status: '待审核',
        priority: 'P1',
        createdAt: '2026-02-10',
        updatedAt: '2026-02-10'
    },
    {
        id: 'MR-043',
        sstsId: 'SSTS-046',
        name: '智能限速识别-性能评估',
        description: '实现识别性能评估工具',
        author: '刘强',
        reviewer: '待分配',
        status: '待审核',
        priority: 'P1',
        createdAt: '2026-02-10',
        updatedAt: '2026-02-10'
    },
    // SSTS-047的MR
    {
        id: 'MR-044',
        sstsId: 'SSTS-047',
        name: '自动泊车入位-车位检测算法',
        description: '实现三种泊车场景的车位检测',
        author: '赵敏',
        reviewer: '算法专家',
        status: '已合并',
        priority: 'P0',
        createdAt: '2026-02-06',
        updatedAt: '2026-02-10'
    },
    {
        id: 'MR-045',
        sstsId: 'SSTS-047',
        name: '自动泊车入位-路径规划',
        description: '实现泊车路径规划算法',
        author: '赵敏',
        reviewer: '技术负责人',
        status: '已合并',
        priority: 'P0',
        createdAt: '2026-02-06',
        updatedAt: '2026-02-11'
    },
    // SSTS-048的MR
    {
        id: 'MR-046',
        sstsId: 'SSTS-048',
        name: '自动泊车入位-控制模块',
        description: '实现泊车控制模块',
        author: '赵敏',
        reviewer: '架构师',
        status: '待审核',
        priority: 'P0',
        createdAt: '2026-02-11',
        updatedAt: '2026-02-11'
    },
    {
        id: 'MR-047',
        sstsId: 'SSTS-048',
        name: '自动泊车入位-轨迹跟踪',
        description: '实现泊车轨迹跟踪控制',
        author: '赵敏',
        reviewer: '待分配',
        status: '待审核',
        priority: 'P0',
        createdAt: '2026-02-11',
        updatedAt: '2026-02-11'
    },
    // SSTS-049的MR
    {
        id: 'MR-048',
        sstsId: 'SSTS-049',
        name: '自动泊车入位-测试场景',
        description: '设计泊车测试场景',
        author: '赵敏',
        reviewer: '测试负责人',
        status: '待审核',
        priority: 'P0',
        createdAt: '2026-02-12',
        updatedAt: '2026-02-12'
    },
    {
        id: 'MR-049',
        sstsId: 'SSTS-049',
        name: '自动泊车入位-安全测试',
        description: '实现泊车安全测试',
        author: '赵敏',
        reviewer: '待分配',
        status: '待审核',
        priority: 'P0',
        createdAt: '2026-02-12',
        updatedAt: '2026-02-12'
    },
    // SSTS-050的MR
    {
        id: 'MR-050',
        sstsId: 'SSTS-050',
        name: '记忆泊车-SLAM定位模块',
        description: '实现视觉SLAM定位',
        author: '孙丽',
        reviewer: '算法专家',
        status: '已合并',
        priority: 'P1',
        createdAt: '2026-02-07',
        updatedAt: '2026-02-12'
    },
    {
        id: 'MR-051',
        sstsId: 'SSTS-050',
        name: '记忆泊车-路径记忆',
        description: '实现泊车路径记忆功能',
        author: '孙丽',
        reviewer: '技术负责人',
        status: '已合并',
        priority: 'P1',
        createdAt: '2026-02-07',
        updatedAt: '2026-02-13'
    },
    // SSTS-051的MR
    {
        id: 'MR-052',
        sstsId: 'SSTS-051',
        name: '记忆泊车-地图构建',
        description: '实现特征点地图构建',
        author: '孙丽',
        reviewer: '算法专家',
        status: '待审核',
        priority: 'P1',
        createdAt: '2026-02-13',
        updatedAt: '2026-02-13'
    },
    {
        id: 'MR-053',
        sstsId: 'SSTS-051',
        name: '记忆泊车-路径回放',
        description: '实现路径回放和动态避障',
        author: '孙丽',
        reviewer: '待分配',
        status: '待审核',
        priority: 'P1',
        createdAt: '2026-02-13',
        updatedAt: '2026-02-13'
    },
    // SSTS-052的MR
    {
        id: 'MR-054',
        sstsId: 'SSTS-052',
        name: '记忆泊车-稳定性测试',
        description: '实现长期稳定性测试',
        author: '孙丽',
        reviewer: '测试负责人',
        status: '待审核',
        priority: 'P1',
        createdAt: '2026-02-14',
        updatedAt: '2026-02-14'
    },
    {
        id: 'MR-055',
        sstsId: 'SSTS-052',
        name: '记忆泊车-精度验证',
        description: '验证定位精度',
        author: '孙丽',
        reviewer: '待分配',
        status: '待审核',
        priority: 'P1',
        createdAt: '2026-02-14',
        updatedAt: '2026-02-14'
    },
    // SSTS-053的MR
    {
        id: 'MR-056',
        sstsId: 'SSTS-053',
        name: '遥控泊车-通信协议',
        description: '实现手机APP与车辆通信协议',
        author: '周杰',
        reviewer: '架构师',
        status: '已合并',
        priority: 'P1',
        createdAt: '2026-02-08',
        updatedAt: '2026-02-14'
    },
    {
        id: 'MR-057',
        sstsId: 'SSTS-053',
        name: '遥控泊车-安全监控',
        description: '实现遥控泊车安全监控',
        author: '周杰',
        reviewer: '安全专家',
        status: '已合并',
        priority: 'P1',
        createdAt: '2026-02-08',
        updatedAt: '2026-02-15'
    },
    // SSTS-054的MR
    {
        id: 'MR-058',
        sstsId: 'SSTS-054',
        name: '遥控泊车-远程控制',
        description: '实现远程控制逻辑',
        author: '周杰',
        reviewer: '技术负责人',
        status: '待审核',
        priority: 'P1',
        createdAt: '2026-02-15',
        updatedAt: '2026-02-15'
    },
    {
        id: 'MR-059',
        sstsId: 'SSTS-054',
        name: '遥控泊车-紧急停车',
        description: '实现紧急停车机制',
        author: '周杰',
        reviewer: '待分配',
        status: '待审核',
        priority: 'P1',
        createdAt: '2026-02-15',
        updatedAt: '2026-02-15'
    },
    // SSTS-055的MR
    {
        id: 'MR-060',
        sstsId: 'SSTS-055',
        name: '遥控泊车-通信测试',
        description: '测试通信稳定性和抗干扰能力',
        author: '周杰',
        reviewer: '测试负责人',
        status: '待审核',
        priority: 'P1',
        createdAt: '2026-02-16',
        updatedAt: '2026-02-16'
    },
    {
        id: 'MR-061',
        sstsId: 'SSTS-055',
        name: '遥控泊车-用户体验测试',
        description: '测试用户体验和交互流程',
        author: '周杰',
        reviewer: '待分配',
        status: '待审核',
        priority: 'P1',
        createdAt: '2026-02-16',
        updatedAt: '2026-02-16'
    }
]

export const getMRById = (id: string): MR | undefined => {
    return mrs.find(mr => mr.id === id)
}

export const getMRsBySSTSId = (sstsId: string): MR[] => {
    return mrs.filter(mr => mr.sstsId === sstsId)
}

export const getMRsByModuleId = (moduleId: string): MR[] => {
    return mrs.filter(mr => mr.moduleId === moduleId)
}

export const getMRsByStatus = (status: MR['status']): MR[] => {
    return mrs.filter(mr => mr.status === status)
}

export const getMRsByIterationId = (iterationId: string): MR[] => {
    return mrs.filter(mr => mr.iterationId === iterationId)
}

export const createMRBatch = (sstsId: string, moduleIds: string[], effort: number): MR[] => {
    const newMRs: MR[] = moduleIds.map((moduleId, index) => ({
        id: `MR-${String(mrs.length + index + 1).padStart(3, '0')}`,
        sstsId,
        moduleId,
        name: `新建MR-${moduleId}`,
        description: '请填写MR描述...',
        effort,
        status: '待分配',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
    }))

    mrs.push(...newMRs)
    return newMRs
}

export const assignMRToIteration = (mrId: string, iterationId: string): void => {
    const mr = getMRById(mrId)
    if (mr) {
        mr.iterationId = iterationId
        mr.status = '已分配'
        mr.updatedAt = new Date().toISOString().split('T')[0]
    }
}
