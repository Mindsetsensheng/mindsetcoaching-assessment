import { IResilienceDimensionAnalysis } from './types'

export const resilienceDimensionAnalysis: IResilienceDimensionAnalysis = {
  stressTolerance: {
    name: '压力承受力',
    description: '此维度反映了您在面对压力和挑战时的承受和调节能力。',
    aspects: ['压力识别能力', '压力管理策略', '压力耐受程度'],
    levels: {
      high: {
        range: [36, 45],
        analysis: '您展现出优秀的压力承受能力，能够有效地应对各种压力情境。',
        suggestions: [
          '继续保持良好的压力管理习惯',
          '尝试指导他人进行压力管理',
          '在更具挑战性的环境中测试自己',
        ],
      },
      good: {
        range: [27, 35],
        analysis: '您具备良好的压力承受能力，通常能够妥善处理压力。',
        suggestions: [
          '进一步完善压力应对策略',
          '建立更系统的压力管理方法',
          '培养积极的压力转化能力',
        ],
      },
      moderate: {
        range: [18, 26],
        analysis:
          '您的压力承受能力处于中等水平，在某些情况下可能需要额外支持。',
        suggestions: [
          '学习更多压力管理技巧',
          '建立日常减压习惯',
          '适当寻求他人支持',
        ],
      },
      low: {
        range: [9, 17],
        analysis: '您的压力承受能力有待提升，可能需要更多的支持和训练。',
        suggestions: [
          '掌握基础的压力管理方法',
          '培养健康的生活方式',
          '寻求专业的压力管理指导',
        ],
      },
    },
  },
  emotionalRecovery: {
    name: '情绪恢复力',
    description:
      '此维度评估您从负面情绪中恢复的能力，包括情绪调节和心理重建能力。',
    aspects: ['情绪识别能力', '情绪调节策略', '心理恢复速度'],
    levels: {
      high: {
        range: [44, 55],
        analysis: '您具备出色的情绪恢复能力，能够快速从负面情绪中调整过来。',
        suggestions: [
          '继续运用有效的情绪管理策略',
          '帮助他人学习情绪调节方法',
          '在更复杂的情境中练习情绪管理',
        ],
      },
      good: {
        range: [33, 43],
        analysis: '您的情绪恢复能力良好，通常能够有效管理自己的情绪状态。',
        suggestions: [
          '拓展情绪调节策略库',
          '建立情绪日记习惯',
          '练习积极情绪培养',
        ],
      },
      moderate: {
        range: [22, 32],
        analysis: '您的情绪恢复能力一般，在某些情况下可能需要较长时间调整。',
        suggestions: [
          '学习基础的情绪管理技巧',
          '培养正念冥想习惯',
          '建立情绪支持系统',
        ],
      },
      low: {
        range: [11, 21],
        analysis: '您的情绪恢复能力需要提升，可能经常被负面情绪困扰。',
        suggestions: [
          '寻求专业的情绪管理指导',
          '培养健康的情绪表达方式',
          '建立日常情绪调节习惯',
        ],
      },
    },
  },
  adaptability: {
    name: '适应能力',
    description: '此维度衡量您面对变化和新环境时的适应和调整能力。',
    aspects: ['变化接受度', '环境适应性', '灵活应变能力'],
    levels: {
      high: {
        range: [40, 50],
        analysis: '您展现出优秀的适应能力，能够灵活应对各种变化和挑战。',
        suggestions: [
          '在更多领域尝试新事物',
          '帮助他人提升适应能力',
          '主动寻求改变和挑战',
        ],
      },
      good: {
        range: [30, 39],
        analysis: '您具备良好的适应能力，通常能够妥善处理环境变化。',
        suggestions: ['拓展舒适区范围', '培养创新思维方式', '提升变化管理能力'],
      },
      moderate: {
        range: [20, 29],
        analysis: '您的适应能力一般，在重大变化面前可能需要更多时间调整。',
        suggestions: [
          '练习接纳变化的心态',
          '培养积极的应对策略',
          '逐步扩大适应范围',
        ],
      },
      low: {
        range: [10, 19],
        analysis: '您的适应能力有待提升，可能对变化比较抗拒。',
        suggestions: ['从小变化开始适应', '建立变化管理计划', '寻求过渡期支持'],
      },
    },
  },
  problemSolving: {
    name: '问题解决能力',
    description: '此维度评估您识别、分析和解决问题的能力。',
    aspects: ['问题分析能力', '解决方案创造力', '执行落实能力'],
    levels: {
      high: {
        range: [40, 50],
        analysis: '您具备出色的问题解决能力，能够有效处理复杂问题。',
        suggestions: [
          '挑战更复杂的问题',
          '分享问题解决经验',
          '发展创新解决方案',
        ],
      },
      good: {
        range: [30, 39],
        analysis: '您的问题解决能力良好，能够处理大多数常见问题。',
        suggestions: ['系统化问题解决方法', '提升决策效率', '培养创新思维能力'],
      },
      moderate: {
        range: [20, 29],
        analysis: '您的问题解决能力一般，可能需要他人协助处理复杂问题。',
        suggestions: [
          '学习问题分析方法',
          '练习解决方案评估',
          '建立问题解决框架',
        ],
      },
      low: {
        range: [10, 19],
        analysis: '您的问题解决能力需要提升，可能经常感到困扰。',
        suggestions: [
          '掌握基础问题分析工具',
          '培养逻辑思维能力',
          '寻求问题解决指导',
        ],
      },
    },
  },
  socialSupport: {
    name: '社会支持',
    description: '此维度反映您建立和利用社会支持网络的能力。',
    aspects: ['人际关系质量', '支持网络广度', '求助意愿度'],
    levels: {
      high: {
        range: [40, 50],
        analysis: '您具有强大的社会支持网络，善于维护和利用社会资源。',
        suggestions: [
          '深化重要关系的质量',
          '帮助他人建立支持网络',
          '发展互助社群',
        ],
      },
      good: {
        range: [30, 39],
        analysis: '您拥有良好的社会支持系统，通常能够获得所需帮助。',
        suggestions: ['拓展社交圈层', '提升社交互动质量', '培养回馈意识'],
      },
      moderate: {
        range: [20, 29],
        analysis: '您的社会支持网络一般，可能需要进一步拓展和深化。',
        suggestions: ['主动建立新联系', '提升社交技能', '培养求助意识'],
      },
      low: {
        range: [10, 19],
        analysis: '您的社会支持网络需要加强，可能感到较为孤立。',
        suggestions: ['从亲近关系开始改善', '参与社群活动', '学习社交技巧'],
      },
    },
  },
}
