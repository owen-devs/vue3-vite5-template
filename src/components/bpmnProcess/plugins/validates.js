export default{
	data(){
		return{
			prefix:'flowable'
		}
	},
	computed:{
		descriptorPrefix(){
			return this.prefix+":"
		}
	},
	methods:{
		mixinsValidateProperties(type) {
			let valid = true
			let startUserFlag = true
			this.currentElement = null
			let startElement = false,
				mutiStart = 0,
				EndElement = false,
				mutiEnd = 0,
				sourceTargetRef = false,
				shapeNameFlag =false,
				mutiGateway = [],
				inOutCount = false

			//规则判断//需要全部节点遍历完
			for(let i = 0; i < this.allElement.length; i++) {
				
				//必须要有开始和结束节点
				if(this.allElement[i].type =="bpmn:StartEvent"){
					startElement = true
					mutiStart++
					//整个流程只能有一个开始节点
					if(mutiStart > 1){
						this.$message.error("规范：一个流程只能有一个[开始节点]！")
						valid = false
						return 
					}
					//开始节点只能有一个出口
					if(this.allElement[i].businessObject.outgoing && this.allElement[i].businessObject.outgoing.length > 1){
						this.$message.error("规范：[开始节点]只能有一个出口！")
						valid = false
						return 
					}
				}
				if(this.allElement[i].type =="bpmn:EndEvent"){
					EndElement = true
					mutiEnd++
					if(mutiEnd > 1){
						this.$message.error("规范：一个流程只能有一个[结束节点]！")
						valid = false
						return 
					}
				}
				
				//开始节点必须和用户任务连接//后端
				if(this.allElement[i].type == "bpmn:SequenceFlow" && startUserFlag){
					const business = this.allElement[i].businessObject
					sourceTargetRef = business.sourceRef.$type =="bpmn:StartEvent" && business.targetRef.$type =="bpmn:UserTask"
					if(sourceTargetRef){
						startUserFlag = false
					}
				}

				//统计网关/同类型成对出现
//					if(this.allElement[i].type.indexOf("Gateway") > -1){
//						if(mutiGateway.length){
//							let sameType = false 
//							mutiGateway.forEach((item)=>{
//								if(item.type == this.allElement[i].type){
//									item.count++
//									sameType = true
//								}
//							})
//							if(!sameType){
//								mutiGateway.push({type:this.allElement[i].type,count:1})
//							}
//						}else{
//							mutiGateway.push({type:this.allElement[i].type,count:1})
//						}
//						//网关应该至少有两个入口或者两个出口
//						if(this.allElement[i].incoming.length < 2 && this.allElement[i].outgoing.length < 2){
//							inOutCount = true
//						}
//					}
			}
			if(!startElement){
				this.$message.error("规范：缺少[开始节点]！")
				valid = false
				return 
			}
			if(!EndElement){
				this.$message.error("规范：缺少[结束节点]！")
				valid = false
				return 
			}
			if(!sourceTargetRef){
				this.$message.error("规范：[开始节点]建议连接[用户任务]节点！")
				valid = false
				return 
			}
//				if(mutiGateway.length){
//					let even = true
//					mutiGateway.forEach((item)=>{
//						if(item.count%2 !=0){
//							even = false
//						}
//					})
//					if(!even){
//						this.$message.error("规范：[网关节点]必须[同类型]成对出现！分支处和汇合处对应出现！")
//						valid = false
//						return
//					}
//					
//				}
//				if(inOutCount){
//					this.$message.error("规范：[网关节点]只在有[分支/汇合]时使用！")
//					valid = false
//					return
//				}
			for(let i = 0; i < this.allElement.length; i++) {
				if(!(this.allElement[i].type == "bpmn:SequenceFlow" || this.allElement[i].type == "label")) {
					if(this.allElement[i].outgoing.length == 0 && this.allElement[i].incoming.length == 0) {
						this.$message.error("规范：有孤立图形，请用箭头连接或删除！")
						valid = false
						return
					}
				}
				if(!(this.allElement[i].type == "bpmn:SequenceFlow" || this.allElement[i].type == "label" || this.allElement[i].type.toLowerCase().indexOf("gateway") > -1)) {
					//验证提示哪个必填的name没填
					if(!this.allElement[i].businessObject.name) {
						this.currentElement = this.allElement[i]
						this.$message.error("有节点没填写名称！")
						valid = false
						return
					}
					
					//验证审批人/为空哪个没选
					if(this.allElement[i].type =="bpmn:UserTask" && this.allElement[i].id!="__initiator__"){
						const businessObj = this.allElement[i].businessObject
						const attrs = businessObj.$attrs
						let errorStr = "请填写节点: "+businessObj['name']
						if(attrs[this.descriptorPrefix+'approverType'] =="3"){
							if(this.attrsDeal(attrs[this.descriptorPrefix+'candidateGroups'])){
								this.$message.error(errorStr+"-> 审批人->群组")
								valid = false
								return
							}
						}
						if(attrs[this.descriptorPrefix+'approverType'] =="4"){
							if(this.attrsDeal(attrs[this.descriptorPrefix+'assignee'])){
								this.$message.error(errorStr+"-> 审批人->指定成员")
								valid = false
								return 
							}
						}
						if(attrs[this.descriptorPrefix+'approverNullType'] =="3"){
							console.log(this.attrsDeal(attrs[this.descriptorPrefix+'nullManager']))
							if(this.attrsDeal(attrs[this.descriptorPrefix+'nullManager'])){
								this.$message.error(errorStr+"-> 审批人为空时->审批管理员")
								valid = false
								return
							}
						}
						if(attrs[this.descriptorPrefix+'approverNullType'] =="2"){
							if(this.attrsDeal(attrs[this.descriptorPrefix+'nullAppointer'])){
								this.$message.error(errorStr+"-> 审批人为空时->指定审批人")
								valid = false
								return
							}
						}
						
						if(attrs[this.descriptorPrefix+"copyApproverType"] == "3"){
							if(this.attrsDeal(attrs[this.descriptorPrefix+'copyGroup'])){
								this.$message.error(errorStr+"-> 抄送人->按群组")
								valid = false
								return
							}
						}
						if(attrs[this.descriptorPrefix+"copyApproverType"] == "4"){
							if(this.attrsDeal(attrs[this.descriptorPrefix+'copyAppointer'])){
								this.$message.error(errorStr+"-> 抄送人->指定成员")
								valid = false
								return
							}
						}
						if(attrs[this.descriptorPrefix+"backType"] == "固定驳回"){
							if(this.attrsDeal(attrs[this.descriptorPrefix+'limitRejectNodeId'])){
								this.$message.error(errorStr+"->允许驳回 ->驳回方式->需要固定驳回的节点")
								valid = false
								return
							}
						}
					}
				}
			}

			return valid
		},
		attrsDeal(attrs){
			return !attrs || (typeof attrs=="string" && attrs.trim() =="") || (Array.isArray(attrs) && attrs.length==0)
		}
	}
}
