import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'


Vue.use(Router)

const router = new Router({
    // 去掉#/的方法
    //mode: 'history',
    //linkActiveClass: 'header-active',
    //hashbang: false,
    //base: '/jpro/',
    //history: true,
    routes: [
        {
            path: '/',
            name: 'index',
            // component: require('@/components/home/Index.vue'),
            component: resolve => require(['@/components/home/Index.vue'], resolve),
            meta: {
                title: '',
            },
            children: [
                {
                    path: 'index/',
                    redirect: '/'
                }
            ]
        },
        {
            path: '/app/index',
            name: 'app/index',
            meta: {
                title: '首页'
            },
            component: resolve => require(['@/components/home/indexNav.vue'], resolve)
        }
        , {
            path: '/projWorkLog',
            name: 'proj/workLog/index',
            meta: {
                title: '施工日志',
            },
            component:  resolve =>require(['@/components/workLog/Index.vue'], resolve)
        }, {
            path: '/proj/workLog/info',
            name: 'proj/workLog/info',
            meta: {
                title: '施工日志添加',
            },
            component:  resolve =>require(['@/components/workLog/WorkLog.vue'], resolve)
        }, {
            path: '/proj/workLog/query',
            name: 'proj/workLog/query',
            meta: {
                title: '施工日志查询'
            },
            component:  resolve =>require(['@/components/workLog/Query.vue'], resolve)
        } , {
            path: '/record/index',
            name: 'record/index',
            meta: {
                title: '随手拍'
            },
            component:  resolve =>require(['@/components/record/Index.vue'], resolve)
        }
        , {
            path: '/record/info',
            name: 'record/info',
            meta: {
                title: '随手拍详情'
            },
            component:  resolve =>require(['@/components/record/Record.vue'], resolve)
        }, {
            path: '/record/show',
            name: 'record/show',
            meta: {
                title: '随手拍图片墙'
            },
            component:  resolve =>require(['@/components/record/Show.vue'], resolve)
        }
        ,{
            path: '/workflow/model/index',
            name: 'workflow/model/index',
            meta: {
                title: '流程配置'
            },
            component: resolve => require(['@/components/workflow/index.vue'], resolve)
        },
        {
            path: '/workflow/model/design',
            name: 'workflow/model/design',
            meta: {
                title: '流程设计'
            },
            component: resolve => require(['@/components/workflow/Design.vue'], resolve)
        }, {
            path: '/workflow/desktop',
            name: 'workflow/desktop',
            meta: {
                title: '流程审批'
            },
            component: resolve => require(['@/components/workflow/Desktop.vue'], resolve)
        },
        {
            path: '/workflow/applyIndex',
            name: 'workflow/applyIndex',
            meta: {
                title: '流程申请'
            },
            component: resolve => require(['@/components/workflow/ApplyIndex.vue'], resolve)
        }, {
            path: '/workflow/apply',
            name: 'workflow/apply',
            meta: {
                title: '我申请的'
            },
            // component: require('@/components/workflow/ApplyList.vue')
            component: resolve => require(['@/components/workflow/ApplyList.vue'], resolve)
        }, {
            path: '/workflow/approval',
            name: 'workflow/approval',
            meta: {
                title: '我的待办'
            },
            component: resolve => require(['@/components/workflow/ApprovalList.vue'], resolve)
        }, {
            path: '/workflow/copy',
            name: 'workflow/copy',
            meta: {
                title: '抄送我的'
            },
            // component: require('@/components/workflow/CopyList.vue')
            component: resolve => require(['@/components/workflow/CopyList.vue'], resolve)
        },
        {
            path: '/processForm',
            name: 'processForm',
            meta: {
                title: '流程处理'
            },
            component: resolve => require(['@/components/common/ProcessForm.vue'], resolve)
        },
        {
            path: '/workflow/formDetailData',
            name: 'workflow/formDetailData',
            meta: {
                title: '表单详细信息'
            },
            // component: require('@/components/workflow/FormDetailData.vue')
            component: resolve => require(['@/components/workflow/FormDetailData.vue'], resolve)
        },
        {
            path: '/workflow/processPng',
            name: 'workflow/processPng',
            meta: {
                title: '查看流程图'
            },
            component: resolve => require(['@/components/workflow/ProcessPng.vue'], resolve)
        },
        {
            path: '/qualityIndex',
            name: 'qualityIndex',
            meta: {
              title: '质量检查'
            },
            component: resolve => require(['@/components/quality/QualityIndex.vue'], resolve)
          },

        {
            path: '/checkBillList',
            name: 'checkBillList',
            meta: {
              title: '质量检查'
            },
            component: resolve => require(['@/components/quality/CheckBillList.vue'], resolve)
        },
        {
            path: '/addQualityInspect',
            name: 'addQualityInspect',
            meta: {
              title: '新增质量检查'
            },
            component: resolve => require(['@/components/quality/AddQualityInspect.vue'], resolve)
        },
        {
            path: '/addImproveBill',
            name: 'addImproveBill',
            meta: {
              title: '新增质量整改单'
            },
            component: resolve => require(['@/components/quality/AddImproveBill.vue'], resolve)
        },{
            path: '/improveBillList',
            name: 'improveBillList',
            meta: {
              title: '质量整改'
            },
            component: resolve => require(['@/components/quality/ImproveBillList.vue'], resolve)
          },

        {
            path: '/checkBillShow',
            name: 'checkBillShow',
            meta: {
              title: '质量检查详情'
            },
            component: resolve => require(['@/components/quality/CheckBillShow.vue'], resolve)
        },
          {
            path: '/improveBillShow',
            name: 'improveBillShow',
            meta: {
              title: '质量整改单'
            },
            component: resolve => require(['@/components/quality/ImproveBillShow.vue'], resolve)
          },
        {
            path: '/addLeave',
            name: 'addLeave',
            meta: {
                title: '新建请假',
            },
            component: resolve => require(['@/components/leave/AddLeave.vue'], resolve)
        },
        {
            path: '/movebx',
            name: 'movebx',
            meta: {
                title: '新建报销',
            },
            component: resolve => require(['@/components/movebx/Movebx.vue'], resolve)
        },
        {
            path: '/sign',
            name: 'sign',
            meta: {
                title: '考勤管理',
            },
            component: resolve => require(['@/components/sign/Sign.vue'], resolve)
        },
        {
            path: '/checkOutWork',
            name: 'checkOutWork',
            meta: {
              title: '外勤签到'
            },
            component: resolve => require(['@/components/sign/child/CheckOutWork.vue'], resolve)
          },{
            path: '/checkOutShow',
            name: 'checkOutShow',
            meta: {
              title: '外勤详情'
            },
            component: resolve => require(['@/components/sign/child/CheckOutShow.vue'], resolve)
          },
          {
            path: '/attRecord',
            name: 'attRecord',
            meta: {
              title: '考勤签到列表'
            },
            component: resolve => require(['@/components/sign/child/AttRecord.vue'], resolve)
          },{
            path: '/checkWork',
            name: 'checkWork',
            meta: {
              title: '考勤签到'
            },
            // component: require('@/components/sign/child/CheckWork.vue')
            component: resolve => require(['@/components/sign/child/CheckWork.vue'], resolve)
          },
          {
            path: '/checkSeting',
            name: 'checkSeting',
            meta: {
              title: '考勤设置'
            },
            component: resolve => require(['@/components/sign/CheckSeting.vue'], resolve)
          },
          {
            path: '/setCheckPoint',
            name: 'setCheckPoint',
            meta: {
              title: '考勤点列表'
            },
            component: resolve => require(['@/components/sign/SetCheckPoint.vue'], resolve)
          },
          {
            path: '/setingPoint',
            name: 'setingPoint',
            meta: {
              title: '考勤点设置'
            },
            component: resolve => require(['@/components/sign/SetingPoint.vue'], resolve)
          },
          {
            path: '/pointEdit',
            name: 'pointEdit',
            meta: {
              title: '新增考勤点'
            },
            component: resolve => require(['@/components/sign/PointEdit.vue'], resolve)
          },
          {
            path: '/setClassList',
            name: 'setClassList',
            meta: {
              title: '考勤班次'
            },
            component: resolve => require(['@/components/sign/SetClassList.vue'], resolve)
          },
          {
            path: '/classEdit',
            name: 'classEdit',
            meta: {
              title: '班次编辑'
            },
            component: resolve => require(['@/components/sign/ClassEdit.vue'], resolve)
          },
          {
            path: '/news/show',
            name: 'news/show',
            meta: {
                title: '新闻详情'
            },
            component: resolve => require(['@/components/home/ShowNews.vue'], resolve)
        }
        ,{
            path: '/sys/manager',
            name: 'sys/manager',
            meta: {
                title: '企业设置',
            },
            component: resolve => require(['@/components/sys/index.vue'], resolve)
        }
        ,{
            path: '/projectList',
            name: 'projectList',
            meta: {
                title: '项目管理'
            },
            component:  resolve =>require(['@/components/project/ProjectList.vue'], resolve)
        }
         ,{
             path: '/addProject',
             name: 'addProject',
             meta: {
                 title: '添加项目'
             },
             component:  resolve =>require(['@/components/project/AddProject.vue'], resolve)
         },{
            path: '/applyBorrowing',
            name: 'applyBorrowing',
            meta: {
                title: '借支申请'
            },
            component:  resolve =>require(['@/components/apply/ApplyBorrowing.vue'], resolve)
        },{
            path: '/business',
            name: 'business',
            meta: {
                title: '出差申请'
            },
            component: resolve =>require(['@/components/apply/ApplyBusiness.vue'], resolve)
        },{
            path: '/safetyIndex',
            name: 'safetyIndex',
            meta: {
              title: '安全检查'
            },
            component: resolve => require(['@/components/safety/SafetyIndex.vue'], resolve)
        },
        {
            path: '/addSafetyCheck',
            name: 'addSafetyCheck',
            meta: {
              title: '新增安全检查'
            },
            component: resolve => require(['@/components/safety/AddSafetyCheck.vue'], resolve)
        },
        {
            path: '/safetyCheckBillList',
            name: 'safetyCheckBillList',
            meta: {
              title: '安全检查列表'
            },
            component: resolve => require(['@/components/safety/SafetyCheckBillList.vue'], resolve)
        },
        {
            path: '/safetyCheckBillShow',
            name: 'safetyCheckBillShow',
            meta: {
              title: '安全检查详情'
            },
            component: resolve => require(['@/components/safety/SafetyCheckBillShow.vue'], resolve)
        },{
            path: '/safetyImproveBillList',
            name: 'safetyImproveBillList',
            meta: {
              title: '安全整改'
            },
            component: resolve => require(['@/components/safety/SafetyImproveBillList.vue'], resolve)
        },
        {
            path: '/addSafetyImproveBill',
            name: 'addSafetyImproveBill',
            meta: {
              title: '安全整改单'
            },
            component: resolve => require(['@/components/safety/AddSafetyImproveBill.vue'], resolve)
        },
        {
            path: '/safetyImproveBillShow',
            name: 'safetyImproveBillShow',
            meta: {
              title: '安全整改单'
            },
            component: resolve => require(['@/components/safety/SafetyImproveBillShow.vue'], resolve)
        },
        {
            path: '/CommencementReportList',
            name: 'CommencementReportList',
            meta: {
              title: '开工报告列表'
            },
            component: resolve => require(['@/components/finance/CommencementReportList.vue'], resolve)
        },
        {
            path: '/CommencementReportitem',
            name: 'CommencementReportitem',
            meta: {
              title: '开工报告添加'
            },
            component: resolve => require(['@/components/finance/CommencementReportitem.vue'], resolve)
        },
        {
            path: '/ReportOnProgressList',
            name: 'ReportOnProgressList',
            meta: {
              title: '进度上报列表'
            },
            component: resolve => require(['@/components/finance/ReportOnProgressList.vue'], resolve)
        },
        {
            path: '/ReportOnProgressItem',
            name: 'ReportOnProgressItem',
            meta: {
              title: '进度上报添加'
            },
            component: resolve => require(['@/components/finance/ReportOnProgressItem.vue'], resolve)
        },
        {
            path: '/newslist',
            name: 'newslist',
            meta: {
                title: '新闻列表'
            },
            component: resolve => require(['@/components/home/NewsList.vue'], resolve)
        },
        {
            path: '/leave/list',
            name: 'leave/list',
            meta: {
                title: '请假列表',
            },
            component: resolve => require(['@/components/leave/workOutBill.vue'], resolve)
        },
        {
            path: '/leave/add',
            name: 'leave/add',
            meta: {
                title: '新建请假',
            },
            component: resolve => require(['@/components/leave/AddLeaveNews.vue'], resolve)
        },
        {
            path: '/leave/outWork',
            name: 'leave/outWork',
            meta: {
                title: '出差列表',
            },
            component: resolve => require(['@/components/leave/workLeaveList.vue'], resolve)
        },
        {
            path: '/leave/addOutWork',
            name: 'leave/addOutWork',
            meta: {
                title: '新建出差',
            },
            component: resolve => require(['@/components/leave/AddOutWork.vue'], resolve)
        },
        {
            path: '/leave/goOutList',
            name: 'leave/goOutList',
            meta: {
                title: '外出列表',
            },
            component: resolve => require(['@/components/leave/GoOutList.vue'], resolve)
        },
        {
            path: '/leave/addGoOut',
            name: 'leave/addGoOut',
            meta: {
                title: '新建外出',
            },
            component: resolve => require(['@/components/leave/AddGoOut.vue'], resolve)
        },
        {
            path: '/lanao/addGoOut',
            name: 'lanao/addGoOut',
            meta: {
                title: '新建外出',
            },
            component: resolve => require(['@/components/leave/AddGoOut.vue'], resolve)
        },
        
        // {
        //     path: '/financeStandbyList',
        //     name: '/financeStandbyList',
        //     meta: {
        //         title: '费用申报'
        //     },
        //     component: resolve => require(['@/components/finance/financeStandbyList.vue'], resolve)
        // }, 
        {
            path: '/ConstructionLogList',
            name: 'ConstructionLogList',
            meta: {
                title: '施工日志列表'
            },
            component: resolve => require(['@/components/finance/ConstructionLogList.vue'], resolve)
        }, 
        {
            path: '/finance/ConstructionLogItem',
            name: 'finance/ConstructionLogItem',
            meta: {
                title: '施工日志添加'
            },
            component: resolve => require(['@/components/finance/ConstructionLogItem.vue'], resolve)
        }, 
        {
            path: '/CompletionInspectionList',
            name: 'CompletionInspectionList',
            meta: {
                title: '竣工检查列表'
            },
            component: resolve => require(['@/components/finance/CompletionInspectionList.vue'], resolve)
        }, 
        {
            path: '/finance/CompletionInspectionItem',
            name: 'finance/CompletionInspectionItem',
            meta: {
                title: '竣工检查添加'
            },
            component: resolve => require(['@/components/finance/CompletionInspectionItem.vue'], resolve)
        }, 
       
        // {
        //     path: '/finance/financeStandbyItem',
        //     name: 'finance/financeStandbyItem',
        //     meta: {
        //         title: '费用申报'
        //     },
        //     component: resolve => require(['@/components/finance/financeStandbyItem.vue'], resolve)
        // }, 
        {
            path: '/MaintenanceRecordsList',
            name: 'MaintenanceRecordsList',
            meta: {
                title: '保养记录列表'
            },
            component: resolve => require(['@/components/finance/MaintenanceRecordsList.vue'], resolve)
        }, 
        {
            path: '/finance/MaintenanceRecordsItem',
            name: 'finance/MaintenanceRecordsItem',
            meta: {
                title: '保养记录添加'
            },
            component: resolve => require(['@/components/finance/MaintenanceRecordsItem.vue'], resolve)
        }, 
        {
            path: '/RepairList',
            name: 'RepairList',
            meta: {
                title: '维修申请列表'
            },
            component: resolve => require(['@/components/finance/RepairList.vue'], resolve)
        }, 
        {
            path: '/finance/RepairItem',
            name: 'finance/RepairItem',
            meta: {
                title: '维修申请添加'
            },
            component: resolve => require(['@/components/finance/RepairItem.vue'], resolve)
        }, 
        {
            path: '/MaintenanceWorkList',
            name: 'MaintenanceWorkList',
            meta: {
                title: '维修派工单'
            },
            component: resolve => require(['@/components/finance/MaintenanceWorkList.vue'], resolve)
        }, 
        {
            path: '/finance/MaintenanceWorkListItem',
            name: 'finance/MaintenanceWorkListItem',
            meta: {
                title: '维修派工单'
            },
            component: resolve => require(['@/components/finance/MaintenanceWorkListItem.vue'], resolve)
        }, 
        {
            path: '/MaintenanceQuotationList',
            name: 'MaintenanceQuotationList',
            meta: {
                title: '维修报价列表'
            },
            component: resolve => require(['@/components/finance/MaintenanceQuotationList.vue'], resolve)
        }, 
        {
            path: '/finance/MaintenanceQuotationItem',
            name: 'finance/MaintenanceQuotationItem',
            meta: {
                title: '维修报价添加'
            },
            component: resolve => require(['@/components/finance/MaintenanceQuotationItem.vue'], resolve)
        }, 
        {
            path: '/MaintenanceFeedbackList',
            name: 'MaintenanceFeedbackList',
            meta: {
                title: '维修反馈列表'
            },
            component: resolve => require(['@/components/finance/MaintenanceFeedbackList.vue'], resolve)
        }, 
        {
            path: '/finance/MaintenanceFeedbackItem',
            name: 'finance/MaintenanceFeedbackItem',
            meta: {
                title: '维修反馈添加'
            },
            component: resolve => require(['@/components/finance/MaintenanceFeedbackItem.vue'], resolve)
        }, 
        {
            path: '/MaintenanceConfirmationList',
            name: 'MaintenanceConfirmationList',
            meta: {
                title: '维修确认列表'
            },
            component: resolve => require(['@/components/finance/MaintenanceConfirmationList.vue'], resolve)
        }, 
        {
            path: '/finance/MaintenanceConfirmationItem',
            name: 'finance/MaintenanceConfirmationItem',
            meta: {
                title: '维修确认添加'
            },
            component: resolve => require(['@/components/finance/MaintenanceConfirmationItem.vue'], resolve)
        }, 
        {
            path: '/YearlyInspectionList',
            name: 'YearlyInspectionList',
            meta: {
                title: '年检问题列表'
            },
            component: resolve => require(['@/components/finance/YearlyInspectionList.vue'], resolve)
        }, 
        {
            path: '/finance/YearlyInspectionItem',
            name: 'finance/YearlyInspectionItem',
            meta: {
                title: '年检问题添加'
            },
            component: resolve => require(['@/components/finance/YearlyInspectionItem.vue'], resolve)
        }, 
        {
            path: '/FeedbackOfAnnualInspectionList',
            name: 'FeedbackOfAnnualInspectionList',
            meta: {
                title: '年检问题反馈列表'
            },
            component: resolve => require(['@/components/finance/FeedbackOfAnnualInspectionList.vue'], resolve)
        }, 
        {
            path: '/finance/FeedbackOfAnnualInspectionItem',
            name: 'finance/FeedbackOfAnnualInspectionItem',
            meta: {
                title: '年检问题反馈添加'
            },
            component: resolve => require(['@/components/finance/FeedbackOfAnnualInspectionItem.vue'], resolve)
        }, 
        {
            path: '/EngineeringMaintenanceList',
            name: 'EngineeringMaintenanceList',
            meta: {
                title: '工程维修派任务池列表'
            },
            component: resolve => require(['@/components/finance/EngineeringMaintenanceList.vue'], resolve)
        }, 
        {
            path: '/finance/EngineeringMaintenanceItem',
            name: 'finance/EngineeringMaintenanceItem',
            meta: {
                title: '工程维修派任务池'
            },
            component: resolve => require(['@/components/finance/EngineeringMaintenanceItem.vue'], resolve)
        }, 
        {
            path: '/PurchaseMaintenanceList',
            name: 'PurchaseMaintenanceList',
            meta: {
                title: '采购维修派任务池列表'
            },
            component: resolve => require(['@/components/finance/PurchaseMaintenanceList.vue'], resolve)
        }, 
        {
            path: '/finance/PurchaseMaintenanceItem',
            name: 'finance/PurchaseMaintenanceItem',
            meta: {
                title: '采购维修派任务池'
            },
            component: resolve => require(['@/components/finance/PurchaseMaintenanceItem.vue'], resolve)
        }, 
		// {
        //     path: '/renduBillList',
        //     name: '/renduBillList',
        //     meta: {
        //         title: '施工申请'
        //     },
        //     component: resolve => require(['@/components/finance/renduBillList.vue'], resolve)
        // }, 
        // {
        //     path: '/finance/renduBillItem',
        //     name: 'finance/renduBillItem',
        //     meta: {
        //         title: '施工申请'
        //     },
        //     component: resolve => require(['@/components/finance/renduBillItem.vue'], resolve)
        // }, 
        
        {
            path: '/FieldProblemsList',
            name: 'FieldProblemsList',
            meta: {
                title: '现场问题反馈列表'
            },
            component: resolve => require(['@/components/finance/FieldProblemsList.vue'], resolve)
        }, 
        {
            path: '/finance/FieldProblemsItem',
            name: 'finance/FieldProblemsItem',
            meta: {
                title: '现场问题反馈添加'
            },
            component: resolve => require(['@/components/finance/FieldProblemsItem.vue'], resolve)
        }, 
        {
            path: '/FieldInspectionList',
            name: 'FieldInspectionList',
            meta: {
                title: '现场检查列表'
            },
            component: resolve => require(['@/components/finance/FieldInspectionList.vue'], resolve)
        }, 
        {
            path: '/finance/FieldInspectionItem',
            name: 'finance/FieldInspectionItem',
            meta: {
                title: '现场检查添加'
            },
            component: resolve => require(['@/components/finance/FieldInspectionItem.vue'], resolve)
        }, 
        {
            path: '/ConcealmentList',
            name: 'ConcealmentList',
            meta: {
                title: '隐蔽检查列表'
            },
            component: resolve => require(['@/components/finance/ConcealmentList.vue'], resolve)
        }, 
        {
            path: '/finance/ConcealmentItem',
            name: 'finance/ConcealmentItem',
            meta: {
                title: '隐蔽检查添加'
            },
            component: resolve => require(['@/components/finance/ConcealmentItem.vue'], resolve)
        }, 
        {
            path: '/ConcealmentProblemList',
            name: 'ConcealmentProblemList',
            meta: {
                title: '隐藏问题反馈列表'
            },
            component: resolve => require(['@/components/finance/ConcealmentProblemList.vue'], resolve)
        }, 
        {
            path: '/finance/ConcealmentProblemItem',
            name: 'finance/ConcealmentProblemItem',
            meta: {
                title: '隐藏问题反馈添加'
            },
            component: resolve => require(['@/components/finance/ConcealmentProblemItem.vue'], resolve)
        }, 
        {
            path: '/CompletionProblemList',
            name: 'CompletionProblemList',
            meta: {
                title: '竣工问题反馈'
            },
            component: resolve => require(['@/components/finance/CompletionProblemList.vue'], resolve)
        }, 
        {
            path: '/finance/CompletionProblemItem',
            name: 'finance/CompletionProblemItem',
            meta: {
                title: '竣工问题反馈'
            },
            component: resolve => require(['@/components/finance/CompletionProblemItem.vue'], resolve)
        }
       

    ],
})
router.beforeEach((to, from, next) => {

    document.title = to.meta.title;
    next();
})

export default router;