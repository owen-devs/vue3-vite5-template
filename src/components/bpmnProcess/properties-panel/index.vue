<template>
	<div class="custom-properties-panel">
		<el-form :rules="rules" :model="propertiesForm" ref="propertiesFormRef">
			<el-form-item prop="propertyName" class="property-name-box">
				<el-input type="text" ref="nameInput" class="property-name" v-if="readOnly" v-model="propertiesForm.propertyName" @blur="editName($event)"></el-input>
				<div class="read-only-box" v-if="!readOnly">
					<span class="read-text">{{propertiesForm.propertyName}}</span>
					<i class="el-icon-edit-outline edit-icon-btn" @click="editName('')"></i>
				</div>
			</el-form-item>
			<span class="hr-box"></span>
			<el-form-item class="approval-container">
				<el-tabs v-model="activeName" @tab-click="handleClick" class="tabs-box" ref="tabsBox" v-if="showTab">
					<el-tab-pane label="bug" name="0" disabled v-if="hiddenTab" style="display:none;"></el-tab-pane>
				    <el-tab-pane label="设置审批人" name="1" class="approval-box" v-if="showApproval">
				    	<el-form-item class="box-each">
					    	<el-form-item label="" class="sub-title to-block">
					    		<span slot="label" class="sub-title">设置审批人</span>
					    	</el-form-item>
					    	<el-form-item class="approver-name-box gray-box to-block">
					    		<div class="approver-box-title">
					    			<span class="tab-title">审批人</span>
					    		</div>
					    		<el-radio-group v-model="propertiesForm.approverType" @change="changeApprovalType">
					    			<el-radio label="1">直属领导</el-radio>
					    			<el-radio label="2">直属部门负责人</el-radio>
					    			<el-radio label="3">按群组</el-radio>
					    			<el-form-item class="group-box" v-if="showApprovalGroup">
					    				<div class="group-content">
					    					<el-tag
												  v-for="tag in groupTags"
												  :key="tag.name"
												  :disable-transitions="true"
												  closable
												  @close="setAppointer('groupTags','approvalGroup','candidateGroups','groupData',tag.value)"
												  :type="tag.type">
												  {{tag.name}}
												</el-tag>
					    				</div>
						    			<el-select
						    				disabled
						    				class="group-selecter disabled" 
						    				v-model="propertiesForm.approvalGroup" 
						    				:popper-append-to-body="false"
						    				multiple placeholder="请选择群组" 
						    				@change="setAppointer('groupTags','approvalGroup','candidateGroups','groupData')"
						    				@click.native="showAddress('group', 'groupTags','approvalGroup','candidateGroups','groupData')"
						    			>
						    				<el-option v-for="item in groupData" :key="item.value" :value="item.value" :label="item.label"></el-option>
						    			</el-select>
					    			</el-form-item>
					    			<el-radio label="4">指定成员</el-radio>
					    			<el-form-item class="group-box" v-if="showApprovalAppointer">
					    				<div class="group-content">
					    					<el-tag
												  v-for="tag in personTags"
												  :key="tag.name"
												  :disable-transitions="true"
												  closable
												  @close="setAppointer('personTags','approvalAppointer','assignee','personData',tag.value)"
												  :type="tag.type">
												  {{tag.name}}
												</el-tag>
					    				</div>
						    			<el-select
						    				disabled
						    				class="group-selecter disabled" 
						    				v-model="propertiesForm.approvalAppointer" 
						    				:popper-append-to-body="false"
						    				multiple placeholder="请选择指定成员" 
						    				@change="setAppointer('personTags','approvalAppointer','assignee','personData')"
						    				@click.native="showAddress('user', 'personTags', 'approvalAppointer', 'assignee', 'personData')"
						    			>
						    				<el-option v-for="item in personData" :key="item.value" :value="item.value" :label="item.label"></el-option>
						    			</el-select>
					    			</el-form-item>
					    			<el-radio label="5">发起人本人</el-radio>
					    		</el-radio-group>
					    	</el-form-item>
				    	</el-form-item>
				    	<el-form-item class="box-each" v-if="showMutiInstance">
					    	<el-form-item label="" class="sub-title to-block">
					    		<span slot="label" class="sub-title">当审批人为多人时</span>
					    	</el-form-item>
					    	<el-form-item class="approver-name-box to-block">
					    		<el-radio-group v-model="propertiesForm.signType" @change="changeSignType">
					    			<el-radio label="1"><span>会签</span><span class="tips-text">（所有人通过才通过）</span></el-radio>
					    			<el-radio label="2"><span>或签</span><span class="tips-text">（一人通过就通过）</span></el-radio>
					    		</el-radio-group>
					    	</el-form-item>
					    </el-form-item>
				    	<span class="hr-box"></span>
				    	<el-form-item class="box-each">
					    	<el-form-item label="" class="sub-title to-block">
					    		<span slot="label" class="sub-title">审批人为空时</span>
					    	</el-form-item>
					    	<el-form-item class="approver-null-box to-block">
					    		<el-radio-group v-model="propertiesForm.approverNullType" @change="changeApproverNullType">
					    			<el-radio label="1">自动通过</el-radio>
					    			<el-radio label="2">指定审批人</el-radio>
				    				<el-form-item class="group-box" v-if="showNullApprovalAppointer">
					    				<div class="group-content">
					    					<el-tag
												  v-for="tag in appointerTags"
												  :key="tag.name"
												  closable
												  :disable-transitions="true"
												  @close="setAppointer('appointerTags','nullApprovalAppointer','nullAppointer','appointerData',tag.value)"
												  :type="tag.type">
												  {{tag.name}}
												</el-tag>
					    				</div>
						    			<el-select
						    				disabled
						    				class="group-selecter disabled"
						    				v-model="propertiesForm.nullApprovalAppointer" 
						    				multiple placeholder="请选择指定审批人" 
						    				:popper-append-to-body="false"
						    				@change="setAppointer('appointerTags','nullApprovalAppointer','nullAppointer','appointerData')"
						    				@click.native="showAddress('user', 'appointerTags','nullApprovalAppointer','nullAppointer','appointerData')"
						    			>
						    				<el-option v-for="item in appointerData" :key="item.value" :value="item.value" :label="item.label"></el-option>
						    			</el-select>
					    			</el-form-item>
					    			<el-radio label="3">转交给审批管理员</el-radio>
					    			<el-form-item class="group-box" v-if="showNullApprovalManager">
					    				<div class="group-content">
					    					<el-tag
												  v-for="tag in managerTags"
												  :key="tag.name"
												  :disable-transitions="true"
												  closable
												  @close="setAppointer('managerTags','nullApprovalManager','nullManager','managerData',tag.value)"
												  :type="tag.type">
												  {{tag.name}}
												</el-tag>
					    				</div>
						    			<el-select
						    				disabled
						    				class="group-selecter disabled" 
						    				v-model="propertiesForm.nullApprovalManager" 
						    				multiple placeholder="请选择审批管理员" 
						    				:popper-append-to-body="false"
						    				@change="setAppointer('managerTags','nullApprovalManager','nullManager','managerData')"
						    				@click.native="showAddress('role', 'managerTags','nullApprovalManager','nullManager','managerData')"
						    			>
						    				<el-option v-for="item in managerData" :key="item.value" :value="item.value" :label="item.label"></el-option>
						    			</el-select>
					    			</el-form-item>
					    		</el-radio-group>
					    	</el-form-item>
				    	</el-form-item>
				    	<span class="hr-box"></span>
				    	<el-form-item class="box-each" v-if="showSamer">
					    	<el-form-item label="" class="sub-title to-block">
					    		<span slot="label" class="sub-title">审批人与发起人是同一人</span>
					    	</el-form-item>
					    	<el-form-item class="approver-null-box to-block">
					    		<el-radio-group v-model="propertiesForm.approvalSamer">
					    			<el-radio label="1">自动通过</el-radio>
					    			<el-radio label="2">由发起人对自己审批</el-radio>
					    			<el-radio label="3">转交给直属上级审批</el-radio>
					    		</el-radio-group>
					    	</el-form-item>
					    	<!--<el-form-item class="to-block">
					    		<div class="tips-text">
					    			<div>提示：</div>
					    			<div>1. 若审批人离职，将自动转交给审批人上级代理</div>
					    			<div>2. 若同一审批人被重复配置，当其第一次操作后，如审批没有发生变化，后续节点会自动通过</div>
					    		</div>
					    		
					    	</el-form-item>-->
				    	</el-form-item>
				    	<span class="hr-box"></span>
				    	<el-form-item class="box-each">
				    		<el-form-item label="" class="sub-title to-block">
					    		<span slot="label" class="sub-title">设置抄送人</span>
					    	</el-form-item>
				    		<el-form-item class="approver-name-box gray-box to-block" v-if="showCopyApprover">
					    		<div class="approver-box-title">
					    			<span class="tab-title">抄送人</span>
					    			<i class="el-icon-close copy-close-icon" @click="deleteCopyApprover"></i>
					    		</div>
					    		<el-radio-group v-model="propertiesForm.copyApproverType" @change="changeCopyApprover">
					    			<el-radio label="1">直属领导</el-radio>
					    			<el-radio label="2">直属部门负责人</el-radio>
					    			<el-radio label="3">按群组</el-radio>
					    			<el-form-item class="group-box" v-if="showCopyApprovalGroup">
					    				<div class="group-content">
					    					<el-tag
												  v-for="tag in copyGroupTags"
												  :key="tag.name"
												  :disable-transitions="true"
												  closable
												  @close="setAppointer('copyGroupTags','copyApprovalGroup','copyGroup','groupData',tag.value)"
												  :type="tag.type">
												  {{tag.name}}
												</el-tag>
					    				</div>
						    			<el-select
						    				disabled
						    				class="group-selecter disabled" 
						    				v-model="propertiesForm.copyApprovalGroup" 
						    				:popper-append-to-body="false"
						    				multiple
						    				placeholder="请选择群组" 
						    				@change="setAppointer('copyGroupTags','copyApprovalGroup','copyGroup','groupData')"
						    				@click.native="showAddress('group', 'copyGroupTags','copyApprovalGroup','copyGroup','groupData')"
						    				
						    			>
						    				<el-option v-for="item in groupData" :key="item.value" :value="item.value" :label="item.label"></el-option>
						    			</el-select>
					    			</el-form-item>
					    			<el-radio label="4">指定成员</el-radio>
					    			<el-form-item class="group-box" v-if="showCopyApprovalAppointer">
					    				<div class="group-content">
					    					<el-tag
												  v-for="tag in copyPersonTags"
												  :key="tag.name"
												  :disable-transitions="true"
												  closable
												  @close="setAppointer('copyPersonTags','copyApprovalAppointer','copyAppointer','personData',tag.value)"
												  :type="tag.type">
												  {{tag.name}}
												</el-tag>
					    				</div>
						    			<el-select
						    				disabled
						    				class="group-selecter disabled" 
						    				v-model="propertiesForm.copyApprovalAppointer" 
						    				multiple
						    				placeholder="请选择指定成员" 
						    				:popper-append-to-body="false"
						    				@change="setAppointer('copyPersonTags','copyApprovalAppointer','copyAppointer','personData')"
						    				@click.native="showAddress('user', 'copyPersonTags','copyApprovalAppointer','copyAppointer','personData')"
						    			>
						    				<el-option v-for="item in personData" :key="item.value" :value="item.value" :label="item.label"></el-option>
						    			</el-select>
					    			</el-form-item>
					    			<el-radio label="5">发起人本人</el-radio>
					    		</el-radio-group>
					    	</el-form-item>
					    	<el-form-item class="minus-plus-box">
					    		<el-link icon="el-icon-plus" :underline="false" v-if="!showCopyApprover" type="primary" href="javascript:void(0)" @click.native="copySomeOne">添加抄送人</el-link>
					    	</el-form-item>
				    	</el-form-item>
				    	<span class="hr-box"></span>
				    	<el-form-item class="box-each">
				    		<el-form-item label="" class="sub-title to-block">
					    		<span slot="label" class="sub-title">扩展脚本</span>
					    	</el-form-item>
					    	<el-form-item class="js-exe-box to-block">
						    	<el-form-item label="前脚本：">
									<el-input @click.native="jsExe('exeBefore')" readonly v-model="propertiesForm.exeBefore" placeholder="请点击编辑"></el-input>
						    	</el-form-item>
						    	<el-form-item label="后脚本：">
									<el-input @click.native="jsExe('exeAfter')" readonly v-model="propertiesForm.exeAfter" placeholder="请点击编辑"></el-input>
						    	</el-form-item>
						    	<el-dialog
						    		custom-class="code-mirror-box"
						    		:visible.sync="showCodeMirror"
								  	width="900px"
								  	top="5vh"
								  	:modal-append-to-body="false"
								  	:close-on-click-modal="false"
								  	:close-on-press-escape="false"
								  	v-loading="codeMirrorLoading"
								  	@close="showCodeMirror==false"
						    	>
						    		<span slot="title" class="js-exe-title">扩展脚本</span>
						    	 	<code-mirror :importValue="importValue" ref="codeMirror" v-if="showCodeMirror"  />
						    	 	<span slot="footer" class="code-mirror-footer">
								    	<el-button class="code-cancel" @click="showCodeMirror = false">取 消</el-button>
								    	<el-button type="primary" class="import-btn" :disabled="codeMirrorLoading" @click="codeImport">填 入</el-button>
								  	</span>
						    	</el-dialog>
					    	</el-form-item>
				    	</el-form-item>
				    </el-tab-pane>
				    <el-tab-pane label="操作权限" name="2" class="operations-box" v-if="showOperations">
				    	<div class="operations-content">
					    	<el-form-item class="box-each" v-if="showOperationsStartUserTask">
						    	<el-form-item class="to-block">
						    		<el-checkbox-group v-model="propertiesForm.buttons">
						    			<el-checkbox class="to-block" label="5">审批可回收（下个节点查看前）</el-checkbox>
						    			<el-checkbox class="to-block" label="8">审批可复制</el-checkbox>
						    			<el-checkbox class="to-block" label="9">审批可打印</el-checkbox>
						    		</el-checkbox-group>
						    	</el-form-item>
					    	</el-form-item>
					    	<el-form-item class="box-each" v-if="showOperationsTaskEvent">
					    		<el-form-item>
					    			<el-checkbox class="to-block" v-model="propertiesForm.isFreeApprove" false-label="2" true-label="1">允许自由审批</el-checkbox>
					    		</el-form-item>
						    	<el-form-item class="to-block need-title">
						    		<div slot="label" class="line-box"><span class="line-title">按钮</span><span class="group-line"></span></div>
						    		<el-checkbox-group v-model="propertiesForm.buttons" @change="changeOperationsType">
						    			<el-checkbox class="to-block" label="3">允许加签</el-checkbox>
						    			<el-checkbox class="to-block" label="4">允许会签</el-checkbox>
						    			<el-checkbox class="to-block" label="5">允许收回</el-checkbox>
						    			<el-checkbox class="to-block" label="6">允许驳回</el-checkbox>
						    			<el-form-item class="reject-type" v-if="showRejectType">
							    			<el-form-item>
							    				<span class="tab-title">驳回方式：</span>
									    		<el-radio-group v-model="propertiesForm.backType" @change="changeRejectType">
									    			<el-radio class="to-block reject-label" value="自由驳回" label="自由驳回"></el-radio>
									    			<el-radio class="to-block reject-label" value="固定驳回" label="固定驳回"></el-radio>
									    			<el-form-item class="group-box" v-if="showLimitReject">
									    				<el-select class="group-selecter" :popper-append-to-body="false" v-model="propertiesForm.limitRejectNodeId">
										    				<el-option v-for="item in allNodeData" :label="item.nodeName" :value="item.nodeId" :key="item.nodeId"></el-option>
										    			</el-select>
									    			</el-form-item>
									    		</el-radio-group>
									    	</el-form-item>
									    	<el-form-item v-if="showBackExecType">
									    		<span class="tab-title">驳回后流转方式：</span>
									    		<el-radio-group v-model="propertiesForm.backExecType">
									    			<el-radio value="逐级审批" label="逐级审批"></el-radio>
									    			<el-radio value="直达本节点" label="直达本节点"></el-radio>
									    		</el-radio-group>
									    	</el-form-item>
								    	</el-form-item>
								    	<el-checkbox class="to-block" label="7">允许委托</el-checkbox>
								    	<el-checkbox class="to-block" label="8">允许复制</el-checkbox>
								    	<el-checkbox class="to-block" label="9">允许打印</el-checkbox>
						    		</el-checkbox-group>
						    	</el-form-item>
						    	<el-form-item class="need-title">
						    		<div slot="label" class="line-box"><span class="line-title">正文</span><span class="group-line"></span></div>
					    			<el-checkbox class="to-block" v-model="propertiesForm.isViewDoc" false-label="2" true-label="1">公文正文可见</el-checkbox>
					    			<el-checkbox class="to-block" v-model="propertiesForm.isEditDoc" false-label="2" true-label="1">公文正文可编辑</el-checkbox>
					    		</el-form-item>
					    	</el-form-item>
					    	<el-form-item class="box-each" v-if="showOperationsEndEvent">
						    	<el-form-item class="to-block">
						    		<el-checkbox-group v-model="propertiesForm.buttons">
								    	<el-checkbox class="to-block" label="7">允许委托</el-checkbox>
								    	<el-checkbox class="to-block" label="8">允许复制</el-checkbox>
								    	<el-checkbox class="to-block" label="允许转发">允许转发</el-checkbox>
						    		</el-checkbox-group>
						    	</el-form-item>
					    	</el-form-item>
					    	<el-form-item class="box-each" v-if="showOperationsGatewayEvent">
						    	<el-form-item class="to-block">
						    		<el-checkbox-group v-model="propertiesForm.buttons">
								    	<el-checkbox class="to-block" label="8">允许复制</el-checkbox>
								    	<el-checkbox class="to-block" label="允许转发">允许转发</el-checkbox>
						    		</el-checkbox-group>
						    	</el-form-item>
					    	</el-form-item>
				    	</div>
				    </el-tab-pane>
				    <el-tab-pane label="表单权限" name="3" v-if="showFormOperations">
				    	<div class="form-operation-box">
				    		<el-table
				    			class="operation-list"
							    :data="propertiesForm.formDefData"
							    style="width: 100%"
							    empty-text="请先获取表单"
							    ref="formOperationTable"
							>
							    <el-table-column
							        prop="title"
							        label="表单字段"
							        width=""
							    ></el-table-column>
							    <el-table-column
							        width="70"
							        label="可读"
							        prop="readonly"
							        label-class-name="header-text"
							    >
								    <template #header>
								    	<el-checkbox :indeterminate="isIndeterminateReadonly" :disabled="propertiesForm.formDefData.length ==0" v-model="checkAllReadonly" @change="handleCheckAllChangeReadonly"></el-checkbox><span class="content-text">可读</span>
								    </template>
							    	<template slot-scope="scope">
							    		<el-checkbox v-model="scope.row.readonly" @change="handleCheckedEachReadonly" :key="scope.$index"></el-checkbox>
							    	</template>
							    </el-table-column>
							    <el-table-column
							        width="70"
							        label="编辑"
							        prop="edit"
							        label-class-name="header-text"
							    >
							    	<template #header>
								    	<el-checkbox :indeterminate="isIndeterminateEdit" :disabled="propertiesForm.formDefData.length ==0" v-model="checkAllEdit" @change="handleCheckAllChangeEdit"></el-checkbox><span class="content-text">编辑</span>
								    </template>
							    	<template slot-scope="scope">
							    		<el-checkbox v-model="scope.row.edit" @change="handleCheckedEachEdit" :key="scope.$index"></el-checkbox>
							    	</template>
							    </el-table-column>
						    </el-table>
				    	</div>
				    </el-tab-pane>
				    <el-tab-pane label="流转设置" name="4" v-if="showCirculation">
				    	<el-form-item prop="execCondition" class="condition-box">
				    		<el-input type="hidden" style="display:none" v-model="propertiesForm.execCondition" placeholder="流转条件"></el-input>
				    		<div class="condition-set-content">
				    			<div class="content-header">流转条件</div>
				    			<div class="text-tips" v-if="propertiesForm.formDefData.length==0"><i class="el-icon-warning"></i><span>请先获取表单</span></div>
				    			<div class="set-content-contianer">
				    				<div class="when-text">当</div>
				    				<div class="content-box-each" v-for="(boxItem, i) in circulationItems">
				    					<div class="inner-content">
					    					<el-select
					    						v-model="circulationItems[i].title"
					    						placeholder="请选择流转条件名"
					    						@change="changeExecCondition"
					    					>
					    						<el-option v-for="item in propertiesForm.formDefData" :key="item.id" :label="item.title" :value="item.title"></el-option>
					    					</el-select>
					    					<el-select
					    						v-model="circulationItems[i].operator"
					    						placeholder="请选择流转条件逻辑符号"
					    						@change="changeExecCondition"
					    					>
					    						<el-option  v-for="item in operators" :key="item" :label="item" :value="item"></el-option>
					    					</el-select>
					    					<el-input v-model="circulationItems[i].value" @input="changeExecCondition" placeholder="请输入流转条件值"></el-input>
				    					</div>
				    					<el-select
				    						v-if="circulationItems.length >= (i+2)"
				    						class="and-or"
				    						v-model="circulationItems[i].andOr"
				    						placeholder="请选择流转条件合并符号"
				    						@change="changeExecCondition"
				    					>
				    						<el-option  v-for="item in andOrs" :key="item.value" :label="item.label" :value="item.value"></el-option>
				    					</el-select>
				    				</div>
				    				<div class="add-minus-box">
				    					<el-link 
				    						class="add-condition" 
				    						icon="el-icon-plus"
				    						:underline="false" 
				    						v-if="circulationItems.length < 2" 
				    						href="javascript:void(0)" 
				    						@click.native="addConditions"
				    					>添加条件</el-link>
				    					<el-link 
				    						class="minus-condition"
				    						icon="el-icon-minus"
				    						:underline="false" 
				    						v-if="circulationItems.length > 1" 
				    						href="javascript:void(0)" 
				    						@click.native="minusConditions"
				    					>减少条件</el-link>
				    				</div>
				    				
				    			</div>
				    		</div>
				    	</el-form-item>
				    </el-tab-pane>
				</el-tabs>
				<address-select-dialog
					:type="addressType"
					multiple
					ref="address"
					size="small"
			      	@dialogClose="dialogClose"
			      	:value="addressValue"
			      	:modal="false"
				></address-select-dialog>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import translations from "../customTranslate/translations"
	import { mapGetters } from 'vuex'
	import addressSelectDialog from '@/components/addressSelectDialog'
	import codeMirror from "@/components/codeMirror"
	export default {
		name:'propertiesPanel',
		components:{
			addressSelectDialog,
			codeMirror
		},
		data(){
			return {
				readOnly:false,
				propertiesForm:{
					propertyName:'请选择节点',
					approverType:[],
					signType:[],
					assignee:[],
					candidateGroups:[],
					approvalGroup:[],
					approvalAppointer:[],
					approverNullType:[],
					nullAppointer:[],
					nullManager:[],
					nullApprovalAppointer:[],
					nullApprovalManager:[],
					approvalSamer:'',
					copyGroup:[],
					copyAppointer:[],
					copyApproverType:[],
					copyApprovalGroup:[],
					copyApprovalAppointer:[],
					isFreeApprove:'',
					isViewDoc:'',
					isEditDoc:'',
					buttons:[],
					backType:'',
					backExecType:"",
					limitRejectNodeId:"",
					execCondition:"",
					formDefData:[],
					exeBefore:"",
					exeAfter:""
				},
				circulationItems:[{
					title:"",
					operator:"",
					value:"",
					andOr:""
				}],
				operators:[
					"等于",
					"大于",
					"小于",
					"大于等于",
					"小于等于",
					"不等于"
				],
				andOrs:[
					{
						label:"且",
						value:"and"
					},
					{
						label:"或",
						value:"or"
					}
				],
				checkAllReadonly:false,
				checkAllEdit:false,
				isIndeterminateReadonly:false,
				isIndeterminateEdit:false,
				hiddenTab:false,
				showTab:false,
				showBackExecType:false,
				showRejectType:false,
				showLimitReject:false,
				showApprovalUser:false,
				showApprovalGroup:false,
				showApprovalAppointer:false,
				showMutiInstance:false,
				showSamer:true,
				showNullApprovalAppointer:false,
				showNullApprovalManager:false,
				showCopyApprover:false,
				showCopyApprovalGroup:false,
				showCopyApprovalAppointer:false,
				showCirculation:false,
				showApproval:false,
				showOperations:true,
				showOperationsStartUserTask:false,
				showOperationsTaskEvent:false,
				showOperationsEndEvent:false,
				showOperationsGatewayEvent:false,
				showFormOperations:false,
				activeName:'2',
				selectedElements:[],
				currentElement:null,
				allElement:[],
				rules:{
					propertyName:[{required:true,message:'节点名称 必填'}]
				},
				moddle:'',
				modeling:'',
				elementRegistry:'',
				bpmnFactory:'',
				eventBus:'',
				eventTypes:'',
				documentation:'',
				prefix:'flowable',
				fixedValue:[
					{
						key:'signScale',//节点完成度
						value:'1'
					}
				],
				groupTags: [],
				personTags: [],
				appointerTags: [],
				managerTags: [],
				copyGroupTags: [],
				copyPersonTags: [],
				groupData:[],
				personData:[],
				appointerData:[],
				managerData:[],
				allNodeData:[],
				originId:"",
				initiator:"__initiator__",
				addressType:'',
				addressValue:[],
				showAddressData:{
					tags:'',
					formKeyName:'',
					updatePropertyName:'',
					menuData:''
					
				},
				showCodeMirror:false,
				codeMirrorLoading:false,
				importValue:"",
				importType:""
				
			}
		},
		props:["modelData","modeler","queryData"],
		computed:{
			descriptorPrefix(){
				return this.prefix+':'
			},
			...mapGetters(['dict', 'tree'])
		},
		watch:{
			modeler(val){
				this.init();
			},
			//带if属于必填项，值变化才触发，没if的是有值才触发update
			'propertiesForm.approvalGroup'(val){
				if(val){
					this.showMutiInstanceBox(val)
				}
			},
			'propertiesForm.approvalAppointer'(val){
				if(val){
					this.showMutiInstanceBox(val)
				}
			},
			'propertiesForm.nullApprovalAppointer'(val){
				if(val){
					this.showMutiInstanceBox(val)
				}
			},
			'propertiesForm.nullApprovalManager'(val){
				if(val){
					this.showMutiInstanceBox(val)
				}
			},
			'propertiesForm.approverType'(val){
				if(val){
					this.updateProperty('approverType', val, true)
				}
			},
			'propertiesForm.approverNullType'(val){
				if(val){
					this.updateProperty('approverNullType', val, true)
				}
			},
			'propertiesForm.nullManager'(val){
				if(val){
					this.updateProperty('nullManager', val, true)
				}
			},
			'propertiesForm.nullAppointer'(val){
				if(val){
					this.updateProperty('nullAppointer', val, true)
				}
			},
			'propertiesForm.approvalSamer'(val){
				if(val){
					this.updateProperty('approvalSamer', val, true)
				}
			},
			'propertiesForm.copyApproverType'(val){
				this.updateProperty('copyApproverType', val, true)
			},
			'propertiesForm.buttons'(val){
				if(val){
					this.updateProperty('buttons', val, true)
				}
				
			},
			'propertiesForm.signType'(val){
				this.updateProperty('signType', val, true)
			},
			'propertiesForm.candidateGroups'(val){
				if(val){
					this.updateProperty('candidateGroups', val, true)
				}
			},
			'propertiesForm.assignee'(val){
				if(val){
					this.updateProperty('assignee', val, true)
				}
			},
			'propertiesForm.formDefData':{
				handler(news,olds){
					if(news && news.length){
						this.setFromDefDataAndFormKey(news)
					}
				},
				immediate:false,
				deep:true
			},
			'propertiesForm.copyGroup'(val){
				if(val){
					this.updateProperty('copyGroup', val, true)
				}
				
			},
			'propertiesForm.copyAppointer'(val){
				if(val){
					this.updateProperty('copyAppointer', val, true)
				}
			},
			'propertiesForm.backType'(val){
				this.updateProperty('backType', val, true)
			},
			'propertiesForm.backExecType'(val){
				this.updateProperty('backExecType', val, true)
			},
			'propertiesForm.limitRejectNodeId'(val){
				this.updateProperty('limitRejectNodeId', val, true)
			},
			'propertiesForm.execCondition'(val){
				if(val){
					this.updateProperty('execCondition', val, true)
				}
			},
			'propertiesForm.isFreeApprove'(val){
				this.updateProperty('isFreeApprove', val, true)
			},
			'propertiesForm.isViewDoc'(val){
				this.updateProperty('isViewDoc', val, true)
			},
			'propertiesForm.isEditDoc'(val){
				this.updateProperty('isEditDoc', val, true)
			},
			currentElement(val){
				console.log(val)
			}
		},
		mounted(){

		},
		methods:{
			async init(){
				this.eventBus = await this.modeler.get("eventBus")
//				this.eventTypes = Object.keys(this.eventBus._listeners)
//				console.log(this.eventTypes)
				this.modeling = await this.modeler.get("modeling")
				this.moddle = await this.modeler.get("moddle")
				this.bpmnFactory = await this.modeler.get("bpmnFactory")
				this.elementRegistry = await this.modeler.get("elementRegistry")
//				const events = ['shape.added','shape.move.end','shape.removed']
				this.allElement = await this.getAllElements()
//				events.forEach((item)=>{
//					this.modeler.on(item,e=>{
//						let shape = e.element?this.elementRegistry.get(e.element.id):e.shape
//
//						if(item =='shape.added'){
//							this.initiatorForFirstUserTask()
//						}else if(item =='shape.move.end'){
//							this.initiatorForFirstUserTask()
//						}else if(item =='shape.removed'){
//							this.initiatorForFirstUserTask()
//						}
//					})
//				})
				
				
				this.modeler.on('root.added', e => {
		            if (e.element.type === 'bpmn:Process') {
		                this.currentElement = e.element
		            }
		      	})
			    this.modeler.on('selection.changed', async e => {
			    	const tempElement =e &&  e.newSelection &&  e.newSelection[0]
			    	console.log(tempElement)
			    	if(tempElement && tempElement.type !="bpmn:Process"){
			    		this.currentElement = tempElement
			    		this.orderInit()
			    	}
			    })
			    this.modeler.on('element.changed', e => {
		    		if(e.element && e.element.type!="bpmn:Process"){
		    			this.currentElement = e.element
			    		this.setNodeName()
			    		this.getAllNodeData()
			    		this.sendUndoRedo()
		    		}
			    })
			    
			    this.$nextTick(()=>{
			    	this.handleCheckedEachReadonly()
			    	this.handleCheckedEachEdit()
			    })
			},
			async getAllElements(){
				let allElements = await this.modeler.get("elementRegistry").getAll().length && this.modeler.get("elementRegistry").getAll()[0].children
				return allElements
			},
			async sendUndoRedo(){
				let canUndo = await this.getCanUndo()
	    		this.$bus.$emit("undo",canUndo)
	    		let canRedo = await this.getCanRedo()
	    		this.$bus.$emit("redo",canRedo)
			},
			getCanUndo(){
				return this.modeler.get("commandStack").canUndo()
			},
			getCanRedo(){
				return this.modeler.get("commandStack").canRedo()
			},
			codeImport(){
				this.propertiesForm[this.importType] = this.$refs.codeMirror.getCurrentValue()
				if(this.importType =="exeBefore"){
					this.createExeBeforeExtensionElements()
				}
				if(this.importType =="exeAfter"){
					this.createExeAfterExtensionElements()
				}
				this.showCodeMirror = false
			},
			jsExe(type){
				this.importType = type
				this.showCodeMirror = true
				this.importValue = this.propertiesForm[type]?this.propertiesForm[type]:""				
			},
			showAddress(type,tags,formKeyName,updatePropertyName,menuData){
				this.addressType = type
				this.addressValue = this[tags].map((item)=>{return item.id})
				this.showAddressData.tags = tags
				this.showAddressData.formKeyName = formKeyName
				this.showAddressData.updatePropertyName = updatePropertyName
				this.showAddressData.menuData = menuData
				
				this.$refs.address.showDialog = true
			},
			dialogClose(data, type){
				this.propertiesForm[this.showAddressData.formKeyName] = data.map((item)=>{return item.id})
				this.setAppointer(this.showAddressData.tags,this.showAddressData.formKeyName,this.showAddressData.updatePropertyName,this.showAddressData.menuData)
			},
			addConditions(){
				this.circulationItems.push({
					title:"",
					operator:"",
					value:"",
					andOr:""
				})
			},
			minusConditions(){
				this.circulationItems[this.circulationItems.length-2].andOr = ''
				this.circulationItems.splice(-1,1)
				this.changeExecCondition()
			},
			async orderInit(){
				await this.initiatorForFirstUserTask()
				this.setPropertiesToRight()
			},
			getElementId(el){
				return this.bpmnFactory.getElementNewId(el)
			},
			async deepForGetElementId(el){
				let isRepeat = false, randomId = this.getElementId(el)
				let allElement = await this.getAllElements()
				for(let i = 0; i < allElement.length; i++) {
					if(randomId == allElement[i].id){
						isRepeat = true
						this.deepForGetElementId(el)
						return 
					}
				}
				if(!isRepeat){
					return randomId
				}
			},
			async initiatorForFirstUserTask(){
				let initiatorElement = await this.elementRegistry.get(this.initiator)
				let allElement = await this.getAllElements()
				for(let i = 0; i < allElement.length; i++) {
					if(allElement[i].type =='bpmn:SequenceFlow'){
						//后端规则：开始节点一定要和用户任务连接，并且只能连接一个用户任务
						const business = allElement[i].businessObject
						let startUserTaskSequenceFlow = business.sourceRef && business.sourceRef.$type =="bpmn:StartEvent" && business.targetRef && business.targetRef.$type =="bpmn:UserTask"
						//判断当前跟这根线连接的id是不是__initiator__，如果不是则将当前跟这根线连接的id改成__initiator__，将原来的_initiator__对象的id重新恢复为原来的id
						if(startUserTaskSequenceFlow){
							let currentUserTaskElement= await this.elementRegistry.get(business.sourceRef && business.targetRef.id)
							
							if(initiatorElement){
								if(initiatorElement.id == currentUserTaskElement.id){
									return 
								}else{
									//先将原来的__initiator__对象id恢复原id
									this.updateElementId(initiatorElement, this.avoidMVVM(this.originId) || await this.deepForGetElementId(initiatorElement))
									await this.modeling.updateProperties(initiatorElement,{name:"节点名称"})
									this.initInitiatorForFirstUserTask(initiatorElement)
									
									//再将当前跟start连接的改为__initiator__
									this.originId = this.avoidMVVM(currentUserTaskElement.id)//原有id先存起来
									await this.updateElementId(currentUserTaskElement,this.initiator)
									this.modeling.updateProperties(currentUserTaskElement,{name:"发起审批"})
									this.clearInitiatorForFirstUserTask(currentUserTaskElement)
								}
							}else{
								this.originId = this.avoidMVVM(currentUserTaskElement.id)//原有id先存起来
								this.updateElementId(currentUserTaskElement,this.initiator)
								this.clearInitiatorForFirstUserTask(currentUserTaskElement)
							}
							return 
						}
					}
				}
			},
			
			initInitiatorForFirstUserTask(elements){
				elements.businessObject.$attrs[this.descriptorPrefix+"buttons"] = ''
				elements.businessObject.$attrs[this.descriptorPrefix+"isFreeApprove"] = '2'
				elements.businessObject.$attrs[this.descriptorPrefix+"isViewDoc"] = '2'
				elements.businessObject.$attrs[this.descriptorPrefix+"isEditDoc"] = '2'
			},
			clearInitiatorForFirstUserTask(elements){
				elements.businessObject.$attrs[this.descriptorPrefix+"buttons"] = ''
				['isFreeApprove','isViewDoc', 'isEditDoc', 'approvalSamer', 'approverNullType', 'approverType', 'assignee', 'copyApproverType', 'nullManager', 'signType'].forEach((item)=>{
					delete elements.businessObject.$attrs[this.descriptorPrefix+item]
				})
			},
			async updateElementId(elements,id){
				await this.elementRegistry.updateId(elements,id)
				elements.businessObject.id = id
			},
			avoidMVVM(val){
				return JSON.parse(JSON.stringify(val || ''))
			},
			setAppointer(tags,formKeyName,updatePropertyName,menuData,removeTags){
				this[tags] = []
				this.propertiesForm[updatePropertyName] = []
				if(removeTags){
					this.propertiesForm[formKeyName].splice(this.propertiesForm[formKeyName].indexOf(removeTags),1)
				}
				let pushObj = []
				this.propertiesForm[formKeyName].forEach((item)=>{
					this[menuData].forEach((each)=>{
						if(item == each.value){
							this[tags].push({
								name: each.label,
								value: each.value,
								id:each.value,
								type: 'info'
							})
							pushObj.push(each.value)
						}
					})
				})
				this.propertiesForm[updatePropertyName] = pushObj
			},
			tempFormData(val){
				let readonly="" , edit=""
				if(val=="1"){
					readonly = false
					edit = false
				}else if(val=="2"){
					readonly = true
					edit = false
				}else if(val =="3"){
					readonly = true
					edit = true
				}
				return {readonly:readonly,edit:edit}
			},
			dealFormDataFrom(datas){
				let formTempData = []
				datas && datas.forEach((item)=>{
					formTempData.push({
						id:item.id,
						title:item.title || "",
						readonly:this.tempFormData(item.rightValue).readonly,
						edit:this.tempFormData(item.rightValue).edit,
						elementCode:item.elementCode || ""
					})
				})
				return formTempData
			},
			getAllExtensions(targetElement){
				targetElement = targetElement?targetElement:this.currentElement
				let extensions = targetElement.businessObject.extensionElements
				return (extensions &&
						extensions.values && 
						extensions.values[0] &&
						extensions.values[0].values &&
						extensions.values[0].values[0] &&
						extensions.values[0].values) || []
			},
			async getExtensionElementByType(type, targetElement){
				let extensionElement = '', getAllExtensions = await this.getAllExtensions(targetElement)
				getAllExtensions.forEach((item)=>{
					if(item.$type == type){
						extensionElement = item
					}
				})
				return extensionElement
			},
			async setFormOperations(){
				let extensionFormRight = await this.getExtensionElementByType(this.descriptorPrefix+"Formright")
				extensionFormRight = extensionFormRight.body
				
				if(extensionFormRight){
					this.propertiesForm.formDefData = this.dealFormDataFrom(JSON.parse(extensionFormRight))
					this.handleCheckedEachReadonly()
					this.handleCheckedEachEdit()
				}else{
					if(this.showFormOperations){
						this.clearFormOperations()
						if(this.propertiesForm.formDefData.length){
							this.setAllFormOperations()//默认全选
							this.setFromDefDataAndFormKey()
						}
					}
				}
			},
			dealFormDataTo(item){
				let rightValue = ''
				if(!item.readonly && !item.edit){
					rightValue = "1"
				}else if(item.readonly && !item.edit){
					rightValue = "2"
				}else if(item.edit){//可写就可读
					rightValue = "3"
				}
				return rightValue
			},
			dealFormTempData(datas){
				let formData = []
				datas && datas.forEach((item)=>{
					formData.push({
						id:item.id,
						title:item.title || "",
						rightValue:this.dealFormDataTo(item),
						elementCode:item.elementCode
					})
				})
				return formData.length && formData
			},
			setAllFormOperations(datas){
				datas = datas && datas.length? datas:this.propertiesForm.formDefData
				datas.forEach((item)=>{
					if(item.readonly == false){
						item.readonly = true
					}
					if(item.edit == false){
						item.edit = true
					}
				})
				this.checkAllReadonly = true
				this.isIndeterminateReadonly = false
				this.checkAllEdit = true
				this.isIndeterminateEdit = false
				
				return datas 
			},
			//当用户更改表单，全部有表单权限的节点都将初始化新表单数据
			async initAllFormRightWhenGetFormDefDataChange(){
				let allElement = await this.getAllElements()
				console.log(allElement)
				allElement.forEach(async (item)=>{
					let extensionFormRight = await this.getExtensionElementByType(this.descriptorPrefix+"Formright", item)
					extensionFormRight = extensionFormRight.body
					if(extensionFormRight){
						this.setFromDefDataAndFormKeyForTargetElement(item)
					}
				})
			},
			setFromDefDataAndFormKey(news){
				if(this.showFormOperations){
					this.createFormRightExtensionElements({
						formRight: this.dealFormTempData(news || this.avoidMVVM(this.propertiesForm.formDefData))
					})
					this.updateProperty('formKey', "leaveApply.form", true)
				}else{
					if(this.currentElement){									
						this.deleteExtensionElement(this.descriptorPrefix+"Formright")
						delete this.currentElement.businessObject.$attrs[this.descriptorPrefix+"formKey"]
					}
				}
				
			},
			setFromDefDataAndFormKeyForTargetElement(targetElement){
				if(targetElement && this.propertiesForm.formDefData.length){
					this.createFormRightExtensionElementsForTargetElement({
						formRight: this.dealFormTempData(this.propertiesForm.formDefData)
					},targetElement)
					this.updateProperty('formKey', "leaveApply.form", true, targetElement)
				}else{
					if(targetElement){									
						this.deleteExtensionElement(this.descriptorPrefix+"Formright",targetElement)
						delete targetElement.businessObject.$attrs[this.descriptorPrefix+"formKey"]
					}
				}
			},
			
			clearFormOperations(){
				this.propertiesForm.formDefData.forEach((item)=>{
					item.readonly = false
					item.edit = false
				})
				this.checkAllReadonly = false
				this.isIndeterminateReadonly = false
				this.checkAllEdit = false
				this.isIndeterminateEdit = false
			},
			getFormDataById(val){
				this.$api.process.getFormDataById({
					"actId": "",
					"flowId": "",
					"formId": val
				}).then((res)=>{
					if(res && res.length){
						this.propertiesForm.formDefData = this.setAllFormOperations(this.dealFormDataFrom(res))
					}else{
						this.propertiesForm.formDefData = []
					}
					this.initAllFormRightWhenGetFormDefDataChange()
					this.handleCheckedEachReadonly()
					this.handleCheckedEachEdit()
				})
			},
			setFixedOperations(){
				
				if(this.currentElement.type =="bpmn:UserTask" && this.currentElement.id!=this.initiator){
					let fixedAttrs = [{
						name:'isFreeApprove',
						defaultVal:'2'
					},{
						name:'isViewDoc',
						defaultVal:'2'
					},{
						name:'isEditDoc',
						defaultVal:'2'
					}]
					this.batchSetAttrs(fixedAttrs,this.currentElement)
					
				}
			},
			batchSetAttrs(arr, elements){
				let attrs = elements.businessObject.$attrs
				Array.isArray(arr) && arr.forEach((item)=>{
					let val = attrs[this.descriptorPrefix+item.name]
					this.propertiesForm[item.name] = val?val : this.updateProperty(item.name, item.defaultVal, true) && item.defaultVal
				})
			},
			setButtons(){
				let attrs = this.currentElement.businessObject.$attrs
				this.propertiesForm.buttons = this.dealSplit(attrs[this.descriptorPrefix+'buttons']) || []

				if(this.propertiesForm.buttons.includes("6")){
					this.showRejectType = true
					this.propertiesForm.backType = attrs[this.descriptorPrefix+'backType'] || '自由驳回'
					if(this.propertiesForm.backType == "固定驳回"){
						this.showLimitReject = true
						this.propertiesForm.limitRejectNodeId = attrs[this.descriptorPrefix+'limitRejectNodeId'] || ''
						this.showBackExecType = true
						this.propertiesForm.backExecType = attrs[this.descriptorPrefix+'backExecType'] || '逐级审批'
						this.getAllNodeData()
						
					}else{
						this.showLimitReject = false
						this.propertiesForm.limitRejectNodeId = ''
						this.showBackExecType = false
						this.propertiesForm.backExecType=""
						
					}
				}else{
					this.showRejectType = false
					this.propertiesForm.backType =''
					this.showLimitReject = false
					this.propertiesForm.limitRejectNodeId = ''
					this.propertiesForm.backExecType = ''
				}
			},
			async setOperations(){
				this.setFixedOperations()
				this.setButtons()
			},
			async getAllNodeData(){
				this.allNodeData = []
				await this.modeler.get("elementRegistry").getAll()[0].children.forEach((item)=>{
					if(item.type =="bpmn:UserTask" && item.id !=this.currentElement.id){
						this.allNodeData.push({nodeId:item.id , nodeName:item.businessObject.name || '请修改节点名称再选择'})
					}
				})
			},
			changeRejectType(val){
				this.showLimitReject = val=="固定驳回" ? true : false
				if(!this.showLimitReject){
					this.propertiesForm.limitRejectNodeId = ""
					this.showBackExecType = false
					this.propertiesForm.backExecType=""
					
				}else{
					this.showBackExecType = true
					this.propertiesForm.backExecType="逐级审批"
					this.getAllNodeData()
				}
			},
			getCurrentElementData(){
				this.$api.process.getNodeDataById({
					id: this.currentElement.id,
					processDefId: this.modeler.getDefinitions().rootElements[0].id
				}).then((res)=>{
					console.log(res);//拿到节点数据填充
					this.setPropertiesToRight()
				})
			},
			handleCheckedEachReadonly(){
				let tempArr = []
				this.propertiesForm.formDefData.forEach((item,i)=>{
	    			if(item.readonly){
	    				tempArr.push(item.readonly)
	    			}
		    	})
				this.checkAllReadonly = this.propertiesForm.formDefData.length === tempArr.length
				this.isIndeterminateReadonly = tempArr.length > 0 && tempArr.length < this.propertiesForm.formDefData.length
			},
	   		handleCheckAllChangeReadonly(val) {
		    	this.propertiesForm.formDefData.forEach((item)=>{
		    		item.readonly = val
		    	})
	        	this.isIndeterminateReadonly = false
	      	},
      		handleCheckedEachEdit(){
				let tempArr = [];
				this.propertiesForm.formDefData.forEach((item,i)=>{
    				if(item.edit){
    					tempArr.push(item.edit)
    				}
    			})
				this.checkAllEdit = this.propertiesForm.formDefData.length === tempArr.length
				this.isIndeterminateEdit = tempArr.length > 0 && tempArr.length < this.propertiesForm.formDefData.length
			},
 			handleCheckAllChangeEdit(val) {
		        this.propertiesForm.formDefData.forEach((item)=>{
		    		item.edit = val;
		    	})
		        this.isIndeterminateEdit = false;
      		},
			changeApprovalType(val){
				this.clearApprovalType()
				this.propertiesForm.candidateGroups = []
				this.propertiesForm.assignee = []
				this.showGroup(val)
				this.showAppointer(val)
				this.showMutiInstanceBox()
			},
			clearApprovalType(){
				this.groupTags = []
				this.personTags = []
				this.propertiesForm.approvalGroup = []
				this.propertiesForm.approvalAppointer = []
			},
			async setGroupData(){
				this.groupData = this.groupData.length? this.groupData : await this.getGroupData()
			},
			async setPersonData(){
				this.personData = this.personData.length? this.personData : await this.getPersonData()
			},
			showGroup(val){
				this.showApprovalGroup = val == "3"?true : false
				if(this.showApprovalGroup){
					this.setGroupData()
				}
			},
			showAppointer(val){
				this.showApprovalAppointer = val =="4"?true : false
				if(this.showApprovalAppointer){
					this.setPersonData()
				}
			},
			showMutiInstanceBox(){
				let isMuti = this.propertiesForm.buttons.includes("3") || this.propertiesForm.buttons.includes("4")
				this.showMutiInstance = this.groupTags.length || this.personTags.length > 1 || this.appointerTags.length > 1 || this.managerTags.length > 1 || isMuti
				if(!this.showMutiInstance){
					this.updateMultiInstanceLoopCharacteristics(false)
				}else{
					this.updateMultiInstanceLoopCharacteristics(true)
				}
			},
			changeSignType(val){
				if(val){
					this.updateMultiInstanceLoopCharacteristics(true) //多实例
				}
			},
			async deleteExtensionElement(type, targetElement){
				let allExtensions = await this.getAllExtensions(targetElement)
				allExtensions.forEach((item,index)=>{
					if(item.$type == type){
						allExtensions.splice(index,1)
					}
				})
				return allExtensions
			},
			async createExeBeforeExtensionElements(){			
				if(this.currentElement.type=="bpmn:UserTask"){
					if(this.propertiesForm.exeBefore){
						let exec_beforeData = await this.moddle.create(this.descriptorPrefix+"Exec_before",{
							name:"exec_before",
							body:this.propertiesForm.exeBefore,
							uri:"http://"+this.prefix+".org/bpmn"
						})
						this.createExtensionElements([exec_beforeData], this.descriptorPrefix+"Exec_before")
					}else{
						await this.deleteExtensionElement(this.descriptorPrefix+"Exec_before")
					}
				}
			},
			async createExeAfterExtensionElements(){			
				if(this.currentElement.type=="bpmn:UserTask"){
					if(this.propertiesForm.exeAfter){
						let exec_afterData = await this.moddle.create(this.descriptorPrefix+"Exec_after",{
							name:"exec_after",
							body:this.propertiesForm.exeAfter,
							uri:"http://"+this.prefix+".org/bpmn"
						})
						this.createExtensionElements([exec_afterData], this.descriptorPrefix+"Exec_after")
					}else{
						await this.deleteExtensionElement(this.descriptorPrefix+"Exec_after")
					}
				}
				
			},
			async createFormRightExtensionElements(options){
				if(this.showFormOperations && options &&  options.formRight){
					let formRightData = await this.moddle.create(this.descriptorPrefix+"Formright",{
						name:'formright',
						uri:"http://"+this.prefix+".org/bpmn",
						body:JSON.stringify(options.formRight)
					})
					this.createExtensionElements([formRightData], this.descriptorPrefix+"Formright")
				}
				
			},
			async createFormRightExtensionElementsForTargetElement(options, targetElement){
				if(options &&  options.formRight && targetElement){
					let formRightData = await this.moddle.create(this.descriptorPrefix+"Formright",{
						name:'formright',
						uri:"http://"+this.prefix+".org/bpmn",
						body:JSON.stringify(options.formRight)
					})
					this.createExtensionElements([formRightData], this.descriptorPrefix+"Formright", targetElement)
				}
				
			},
			async createExtensionElements(propertiesValues, type, targetElement){
				let originExtensionItems = await this.deleteExtensionElement(type, targetElement)
				originExtensionItems = propertiesValues.length?originExtensionItems.concat(propertiesValues):originExtensionItems
				if(originExtensionItems.length){
					const extensionItems = await this.moddle.create(this.descriptorPrefix+"Properties",{
						values:originExtensionItems,
						uri:"http://"+this.prefix+".org/bpmn"
					})
					const extensions = await this.moddle.create('bpmn:ExtensionElements',{values:[extensionItems]})
					this.updateExtensionElements(extensions, targetElement)
				}
			},
			changeExecCondition(val){
				this.propertiesForm.execCondition=""
				this.circulationItems.forEach((item,index)=>{//只考虑了两层条件
					let headText = index == 0?(item.andOr+"@@"):""
					this.propertiesForm.execCondition += headText+item.title+"@"+item.operator+"@"+item.value+(item.andOr?";":'')
				})
				this.createSequenceFlowConditionExpression(val)
			},
			createSequenceFlowConditionExpression(val){
				let isGateWay = this.currentElement.businessObject
				if(this.showCirculation && this.currentElement && this.currentElement.type == "bpmn:SequenceFlow" && isGateWay.sourceRef.$type.indexOf("Gateway") > -1){
					const conditionExpression = this.bpmnFactory.create("bpmn:FormalExpression",{body:"${"+this.currentElement.id+"}"})
					isGateWay.conditionExpression = conditionExpression
				}
			},
			setSequenceFlowConditionExpression(){
				let isGateWay = this.currentElement.businessObject
				if(this.showCirculation && this.currentElement && this.currentElement.type == "bpmn:SequenceFlow" && isGateWay.sourceRef.$type.indexOf("Gateway") > -1){
					const conditionExpression = isGateWay.conditionExpression
					this.propertiesForm.execCondition = this.avoidMVVM(conditionExpression && conditionExpression.values)
				}
			},
			updateMutiTask(){
				const flowProperties = this.moddle.create(this.descriptorPrefix+"executionListener",{
					delegateExpression:'${countersignListener}',
					event:"start"
				})
				const modelerProperties = this.moddle.create("modeler:initiator-can-complete",{
					value:'<![CDATA[false]]>',
					'xmlns:modeler':"http://"+this.prefix+".org/modeler"
				})
				const extensions = this.moddle.create('bpmn:ExtensionElements',{values:[modelerProperties,flowProperties]})
				this.updateExtensionElements(extensions)
				this.updateMultiInstanceLoopCharacteristics(true)
				
			},
			updateMultiInstanceLoopCharacteristics(bool){
				if(bool){
					this.propertiesForm.signType  = this.avoidMVVM(this.currentElement.businessObject.$attrs[this.descriptorPrefix+'signType']) || "1"
					let loopCharacteristics = this.moddle.create("bpmn:MultiInstanceLoopCharacteristics")
					loopCharacteristics.$attrs[this.descriptorPrefix+'collection'] = 'assigneeList'
					loopCharacteristics.$attrs[this.descriptorPrefix+'elementVariable'] = 'assignee'

					let isSequential = this.propertiesForm.signType == "1"? true : false //true为串行一个个完成才通过
					
					//目前后端这个值是固定的，暂时保留串行和并行
					loopCharacteristics['isSequential'] = false //设置是串行还是并行
					loopCharacteristics.$attrs['isSequential'] = false  //属性

					let taskCondition = '';
					taskCondition = isSequential?'${flowTaskMultiInstance.accessCondition(execution)}' : '${flowTaskMultiInstance.accessCondition(execution)}'
	
					let completionCondition = this.bpmnFactory.create("bpmn:FormalExpression",{body:taskCondition})
//					let completionCondition = this.bpmnFactory.create("bpmn:FormalExpression",{body:'${nrOfCompletedInstances == 1}'})//一个通过就行
					completionCondition.$parent = this.currentElement
					loopCharacteristics['completionCondition'] = completionCondition
//					loopCharacteristics['inputDataItem'] = inputDataItem
//					loopCharacteristics['loopCardinality'] = loopCardinality

					this.modeling.updateProperties(this.currentElement,{loopCharacteristics:loopCharacteristics});
				}else{
					this.propertiesForm.signType = ''
					this.currentElement && delete this.currentElement.businessObject.loopCharacteristics
				}
			},
			changeApproverNullType(val){
				this.clearApprovalNullType()
				this.propertiesForm.nullManager = []
				this.propertiesForm.nullAppointer = []
				this.showNullAppointer(val)
				this.showNullManager(val)
				this.showMutiInstanceBox()
			},
			clearApprovalNullType(){
				this.appointerTags = []
				this.managerTags = []
				this.propertiesForm.nullApprovalManager = []
				this.propertiesForm.nullApprovalAppointer = []
			},
			showNullManager(val){
				this.showNullApprovalManager = val =="3"?true:false
				if(this.showNullApprovalManager){
					this.setNullManagerData()
				}
			},
			showNullAppointer(val){
				this.showNullApprovalAppointer= val =="2"?true:false
				if(this.showNullApprovalAppointer){
					this.setNullAppointerData()
				}
			},
			async setNullManagerData(){
				this.managerData = this.managerData.length? this.managerData : await this.getManagerData()
			},
			async setNullAppointerData(){
				this.appointerData = this.appointerData.length? this.appointerData : await this.getAppointerData()
			},
			showCopyGroup(val){
				this.showCopyApprovalGroup = val == "3"?true : false
				if(this.showCopyApprovalGroup){
					this.setGroupData()
				}
			},
			showCopyAppointer(val){
				this.showCopyApprovalAppointer = val =="4"?true : false
				if(this.showCopyApprovalAppointer){
					this.setPersonData()
				}
			},
			changeCopyApprover(val){
				this.clearCopyApprovalType()
				this.showCopyGroup(val)
				this.showCopyAppointer(val)
			},
			clearCopyApprovalType(){
				this.copyGroupTags = []
				this.copyPersonTags = []
				this.propertiesForm.copyApprovalGroup = []
				this.propertiesForm.copyApprovalAppointer = []
			},
			changeOperationsType(val){
				this.showRejectType = this.propertiesForm.buttons.includes("6")
				let hadChose = this.propertiesForm.backType && this.propertiesForm.backExecType
				if(!hadChose && this.showRejectType){
					//初始值
					this.showLimitReject = false
					this.propertiesForm.backType = '自由驳回'
					this.showBackExecType = false
					this.propertiesForm.backExecType=""
				}
				if(!this.showRejectType){
					this.propertiesForm.backType = ''
					this.propertiesForm.backExecType = ''
					this.propertiesForm.limitRejectNodeId =''
				}
				this.showMutiInstanceBox()
			},
			setRightShowType(){
				this.showTab = true
				switch(this.currentElement && this.currentElement.type){
//					case 'bpmn:StartEvent':
//						this.showApproval = false
//						this.showOperations = false
//						this.showFormOperations = false
//						this.showCirculation = false
//						
//						this.showOperationsStartUserTask = false
//						this.showOperationsTaskEvent = false
//						this.showOperationsEndEvent = false
//						this.showOperationsGatewayEvent = false
//
//						this.activeName = '2'
//						break ;
//						
					case 'bpmn:Task':
					case 'bpmn:UserTask':
						if(this.currentElement.id == this.initiator){
							this.showApproval = false
							this.showOperations = true
							this.showFormOperations = true
							this.showCirculation = false
							
							this.showOperationsStartUserTask = true
							this.showOperationsTaskEvent = false
							this.showOperationsEndEvent = false
							this.showOperationsGatewayEvent = false
							this.activeName = '2'
						}else{
							this.showApproval = true
							this.showOperations = true
							this.showFormOperations = true
							this.showCirculation = false
							
							this.showOperationsStartUserTask = false
							this.showOperationsTaskEvent = true
							this.showOperationsEndEvent = false
							this.showOperationsGatewayEvent = false
							this.activeName = '1'
						}

						break ;
						
//					case 'bpmn:EndEvent':
//						this.showApproval = false
//						this.showOperations = false
//						this.showFormOperations = false
//						this.showCirculation = false
//						
//						this.showOperationsStartUserTask = false
//						this.showOperationsTaskEvent = false
//						this.showOperationsEndEvent = false
//						this.showOperationsGatewayEvent = false
//						
//						this.activeName = '2'
//						break ;
//						
//					case 'bpmn:ExclusiveGateway':
//					case 'bpmn:ParallelGateway':
//					case 'bpmn:InclusiveGateway':
//					case 'bpmn:ComplexGateway':
//					case 'bpmn:EventBasedGateway':
//						this.showApproval = false
//						this.showOperations = true
//						this.showFormOperations = true
//						this.showCirculation = true
//						
//						this.showOperationsStartUserTask = false
//						this.showOperationsTaskEvent = false
//						this.showOperationsEndEvent = false
//						this.showOperationsGatewayEvent = true
//						
//						this.activeName = '2'
//						break ;
					
					case 'bpmn:SequenceFlow':
						this.showApproval = false
						this.showOperations = false
						this.showFormOperations = false
						let sourceRef = this.currentElement.businessObject.sourceRef
						this.showCirculation = sourceRef &&  sourceRef.$type.indexOf("Gateway") > -1

						this.showOperationsStartUserTask = false
						this.showOperationsTaskEvent = false
						this.showOperationsEndEvent = false
						this.showOperationsGatewayEvent = false

						this.activeName = '4'
						break ;
//						
//					case 'bpmn:IntermediateThrowEvent':
//						this.showApproval = false
//						this.showOperations = true
//						this.showFormOperations = true
//						this.showCirculation = true
//						
//						this.showOperationsStartUserTask = false
//						this.showOperationsTaskEvent = false
//						this.showOperationsEndEvent = false
//						this.showOperationsGatewayEvent = true
//						this.activeName = '2'
//						break;
						
					default :
						this.showApproval = false
						this.showFormOperations = false
						this.showCirculation = false
						this.showOperations = false
						
						this.showOperationsStartUserTask = false
						this.showOperationsTaskEvent = false
						this.showOperationsEndEvent = false
						this.showOperationsGatewayEvent = false
						
						this.activeName = '2'
						break ;
				}
			},
			setNodeName(){
				if(this.currentElement && this.currentElement.businessObject){
					let business = this.currentElement.businessObject, name = this.currentElement.businessObject.name
					if(this.currentElement.type=="bpmn:UserTask"){
						if(name && name!="节点名称"){
							this.propertiesForm.propertyName = name
						}else {
							this.propertiesForm.propertyName = this.currentElement.id == this.initiator? this.currentElement.businessObject.name="发起审批":this.currentElement.businessObject.name="节点名称"
						}
					}else{
						if(name){
							this.propertiesForm.propertyName = name
						}else{
//							if(this.currentElement.type=="bpmn:StartEvent" || this.currentElement.type=="bpmn:EndEvent"){
//								this.changeBaseField('name',translations[this.currentElement.type])
//								this.currentElement.businessObject.name = translations[this.currentElement.type]
//								this.propertiesForm.propertyName = translations[this.currentElement.type]
//							}else{
								this.propertiesForm.propertyName = translations[this.currentElement.type]
//							}
						}
					}
					
				}else if(!this.currentElement || JSON.stringify(this.currentElement) == "{}"){
					this.propertiesForm.propertyName = '请选择节点';
				}
			},
			setCirculation(){
				if(this.showCirculation){
					if(this.queryData.formId){
						this.getFormDataById(this.queryData.formId)
					}
					let execCondition = this.currentElement.businessObject.$attrs[this.descriptorPrefix+'execCondition'] || ''
					this.propertiesForm.execCondition = execCondition
					//回填显示and@@请假天数@等于@1111;请假天数@等于@345
					let splitArr = []
					this.circulationItems = []
					if(execCondition.indexOf(";") > -1){
						//目前只做了两层条件
						let tempSplitArr= execCondition.split(";")
						tempSplitArr.forEach((item)=>{
							splitArr.push(item.split("@").filter((s)=>{ return s && s.trim() }))
						})
						
						splitArr.forEach((item,i)=>{
							this.addConditions()
							if(i==0){
								this.circulationItems[i].andOr = item[0]
								this.circulationItems[i].title = item[1]
								this.circulationItems[i].operator = item[2]
								this.circulationItems[i].value = item[3]
							}else{
								this.circulationItems[i].title = item[0]
								this.circulationItems[i].operator = item[1]
								this.circulationItems[i].value = item[2]
							}
							
						})
					}else{
						//单个条件
						splitArr = execCondition.split("@").filter((s)=>{
							return s && s.trim() //去空
						})
						this.addConditions()
						this.circulationItems[0].title = splitArr[0]
						this.circulationItems[0].operator = splitArr[1]
						this.circulationItems[0].value = splitArr[2]
					}
				}
			},
			async setPropertiesToRight(){
				this.setNodeName()
				this.showTab = false
				this.setRightShowType()
				this.setFixedValue()
				if(this.showApproval){
					await this.clearApprovalPart()
					this.setApprovalPart()
					this.setApproverNullType()
					this.setSamer()
					this.setCopApproverType()
					this.setjsExe()
				}else{
					if(this.currentElement.id == this.initiator){
						await this.clearApprovalPart()
						console.log("4545")
						this.clearInitiatorForFirstUserTask(this.currentElement)
					}
				} 
				if(this.showOperations){
					this.setOperations()
				}
				if(this.showFormOperations){
					this.setFormOperations()
				}
				this.setSequenceFlowConditionExpression()
				if(this.showCirculation){
					this.setCirculation()
				}
			},
			clearApprovalPart(){
				this.clearApprovalType()
				this.showApprovalGroup = false
				this.showApprovalAppointer = false
				this.propertiesForm.approverType = ''
				this.propertiesForm.signType = ''
				this.propertiesForm.approverNullType = ''
				this.clearApprovalNullType()
				this.showNullApprovalAppointer = false
				this.showNullApprovalManager = false
				this.propertiesForm.approvalSamer= ''
				this.clearCopyApprovalType()
				this.showCopyApprover = false
				this.showCopyApprovalGroup = false
				this.showCopyApprovalAppointer = false
				
			},
			async setApprovalPart(){
				const attrs = this.currentElement.businessObject.$attrs
				let approverType = this.avoidMVVM(attrs[this.descriptorPrefix+'approverType']) || "4"
				this.propertiesForm.approverType = approverType

				if(approverType == "3"){
					await this.showGroup(approverType)
					this.propertiesForm.approvalGroup = this.dealSplit(this.avoidMVVM(attrs[this.descriptorPrefix+'candidateGroups'])) || []
					this.setAppointer('groupTags','approvalGroup','candidateGroups','groupData')
					
				}else if(approverType == "4"){
					await this.showAppointer(approverType)
					this.propertiesForm.approvalAppointer = this.dealSplit(this.avoidMVVM(attrs[this.descriptorPrefix+'assignee'])) || []
					this.setAppointer('personTags','approvalAppointer','assignee','personData')
				}
				this.showMutiInstanceBox()
			},
			async setApproverNullType(){
				const attrs = this.currentElement.businessObject.$attrs
				let approverNullType = this.avoidMVVM(attrs[this.descriptorPrefix+'approverNullType']) || "3"
				this.propertiesForm.approverNullType = approverNullType
				
				if(approverNullType == "2"){
					await this.showNullAppointer(approverNullType)
					this.propertiesForm.nullApprovalAppointer = this.dealSplit(this.avoidMVVM(attrs[this.descriptorPrefix+'nullAppointer']))|| []
					this.setAppointer('appointerTags','nullApprovalAppointer','nullAppointer','appointerData')
				}else if(approverNullType == "3"){
					await this.showNullManager(approverNullType)
					this.propertiesForm.nullApprovalManager = this.dealSplit(this.avoidMVVM(attrs[this.descriptorPrefix+'nullManager'])) || []
					this.setAppointer('managerTags','nullApprovalManager','nullManager','managerData')
				}
				this.showMutiInstanceBox()
			},
			setSamer(){
				const attrs = this.currentElement.businessObject.$attrs
				let approvalSamer = this.avoidMVVM(attrs[this.descriptorPrefix+'approvalSamer']) ||'2'
				this.propertiesForm.approvalSamer = approvalSamer
			},
			async setCopApproverType(){
				
				const attrs = this.currentElement.businessObject.$attrs
				let copyApproverType = this.avoidMVVM(attrs[this.descriptorPrefix+'copyApproverType'])
				this.propertiesForm.copyApproverType = copyApproverType
				this.showCopyApprover = copyApproverType ? true : false
				if(this.showCopyApprover){
					if(copyApproverType == "3"){
						await this.showCopyGroup(copyApproverType)
						this.propertiesForm.copyApprovalGroup = this.avoidMVVM(this.dealSplit(attrs[this.descriptorPrefix+'copyGroup'])) || []
						this.setAppointer('copyGroupTags','copyApprovalGroup','copyGroup','groupData')
						
					}else if(copyApproverType == "4"){
						await this.showCopyAppointer(copyApproverType)
						this.propertiesForm.copyApprovalAppointer = this.avoidMVVM(this.dealSplit(attrs[this.descriptorPrefix+'copyAppointer'])) || []
						this.setAppointer('copyPersonTags','copyApprovalAppointer','copyAppointer','personData')
					}
				}
			},
			async setjsExe(){
				if(this.currentElement.type =="bpmn:UserTask"){
					const exec_before = await this.getExtensionElementByType(this.descriptorPrefix+"Exec_before")
					const exec_after = await this.getExtensionElementByType(this.descriptorPrefix+"Exec_after")
					this.propertiesForm.exeBefore = this.avoidMVVM(exec_before.body)
					this.propertiesForm.exeAfter = this.avoidMVVM(exec_after.body)
				}
			},
			dealSplit(val){
				if(val){
					if(Array.isArray(val)){
						return val
					}else{
						return val.split(",")
					}
				}else{
					return ''
				}
			},
			async getPersonData(){
				let datas = []
				this.dict.user.forEach((item)=>{
					datas.push({label:item.nickname,value:item.userId})
				})
				return datas
			},
			async getGroupData(){
				let datas = []
				this.dict.group.forEach((item)=>{
					datas.push({label:item.name,value:item.id})
				})
				return datas
			},
			async getManagerData(){
				let datas = []
				this.dict.role.forEach((item)=>{
					datas.push({label:item.roleName,value:item.id})
				})
				return datas
			},
			async getAppointerData(){
				let datas = []
				this.dict.user.forEach((item)=>{
					datas.push({label:item.nickname,value:item.userId})
				})
				return datas
			},
			setFixedValue(){
				//后端要的固定属性值
				this.fixedValue.forEach((item)=>{
					this.updateProperty(item.key,item.value,true)
				})
			},
			async updateProperty(propertyName, val, hasDescriptor, targetElement) {
		        let properties = {}
		        if (hasDescriptor) {
		            propertyName = this.descriptorPrefix + propertyName
		        }
		        properties[propertyName] = val
		        targetElement = targetElement?targetElement:this.currentElement
		        await this.modeling.updateProperties(targetElement, properties)
		    },
			updateBaseInfo(property,val){
				let attrObj = {};
				attrObj[property] = val
				this.modeling.updateProperties(this.currentElement,attrObj);
			},
			changeBaseField(property,e,type){
				if(!this.currentElement || JSON.stringify(this.currentElement) =='{}'){
					return ;
				}
				e = e || e.event
				const val = (e.target && e.target.value) || e
				
				if(typeof val =='string'){
					this.updateBaseInfo(property, val)
				}else{
					this.updateBaseInfo(property, '')
				}
				
			},
			updateExtensionElements(extensions,targetElement){
				targetElement = targetElement?targetElement:this.currentElement
				this.modeling.updateProperties(targetElement,{extensionElements:extensions});
			},
			deleteCopyApprover(){
				this.showCopyApprover = false
				this.propertiesForm.copyApproverType = []
				this.clearCopyApprovalType()
				this.propertiesForm.copyGroup = []
				this.propertiesForm.copyAppointer = []
				
			},
			copySomeOne(){
				this.showCopyApprover = true
				this.clearCopyApprovalType()
				this.propertiesForm.copyApproverType = "4"
				this.showCopyAppointer("4")
			},
			editName(e){
				if(e && this.currentElement){
					this.changeBaseField('name',e)
					this.getAllNodeData()
				}
				this.readOnly = !this.readOnly;
				this.$nextTick(()=>{
					this.$refs.nameInput && this.$refs.nameInput.focus();
				})
				
			},
			handleClick(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>

.to-block{display:block;}
.custom-properties-panel{
	padding:0 20px 20px 0;
	background-color:#f0f0f0;
	
	::v-deep {
		.copy-close-icon{
			font-size:20px;
			position:absolute;
			right: 5px;
			top:10px;
			cursor:pointer
		}
		.property-name-box{
			padding:5px 0 0 20px;
			
			.property-name {
				height:32px;
				
				.el-input__inner {
					font-weight:bold;
					font-size:16px;
					padding-left:2px;
					height:32px;
				}
				i.edit-icon-btn{
					font-size:20px;
					color:#333;
				}
			}
			.read-only-box{
				padding-left:2px;
				font-size:0;

				i {
					color:#333;
					display:inline-block;
					vertical-align: middle;
					font-size:20px;
				}
				.read-text{
					color:#2793ff;
					max-width:220px;
					padding-right:8px;
					padding-left:1px;
					overflow:hidden;
					text-overflow: ellipsis;
					white-space:nowrap;
					font-weight:bold;
					font-size:16px;
					height:38px;
					line-height:36px;
					display:inline-block;
					vertical-align: middle;
				}
			}
		}
		.tabs-box {
			width:280px;
			padding-bottom:30px;
			
			.el-tabs__nav{
				margin-left:10px;
			}
			.el-tabs__item{
				height:40px;
				padding:0 9px;
				font-weight:bold;
				color:#666;
				
				&.is-active{
					color:#2793ff;
				}
			}
			
			.box-each{
				padding-left:20px;
				padding-bottom:10px;
			}
			.el-tabs__header{
				padding:0 0 0 0;
				
			}
			.el-tabs__content{
				overflow:visible;
			}
			.el-form-item {
				width:280px;
			}
			.el-tabs__nav-wrap{
				overflow: visible;
				&::after{
					background-color:#c5c5c5;
					height:1px;
					width:320px;
				}
				.el-tabs__active-bar{
					background-color:#2793ff;
				}
			}
		}
		.tab-title {
			display: block;
			font-size:14px;
			height:40px;
			line-height:40px;
			padding:0 14px;
			color:#333;
			border-bottom:1px solid #c5c5c5;;
		}
		.approval-container{
			display: block;
			margin-right:0;
		}
		.approval-box {
			padding-bottom:20px;
			
			.el-radio{
				color:#333;
			}
			.el-radio__input.is-checked+.el-radio__label{
				color:#333;
			}
			.gray-box{
				background-color:#e6e6e6;
			}
			.approver-name-box{
				margin-bottom:10px;
				border:1px solid #c5c5c5;
				border-radius:3px;
				-webkit-border-radius:3px;
				
				.el-checkbox-group {
					line-height: 34px;
					padding:8px 0;
					
					&>label{
						display:block;
						padding:0 14px; 
					}
				}
				.el-radio-group {
					padding:8px 0;
					
					&>label{
						display:block;
						padding:8px 14px; 
					}
				}
			}
			.approver-null-box{
				border:1px solid transparent;
				border-radius:3px;
				-webkit-border-radius:3px;
				
				.el-radio-group {
					padding:0 0 8px 0;
					display:block;
					
					&>label{
						display:block;
						padding:8px 0px; 
					}
				}
			}
			.sub-title {
				color:#333;
				font-weight:bold;
			}
			.minus-plus-box{
				padding:0;
				height:40px;
			}
			.approval-user-name{
				padding-left:38px;
				
				.el-input__inner{
					height:32px;
					line-height:32px;
				}
			}
			.approval-user{
				padding-left:24px;
				display:block;
				
				.el-input__inner{
					height:32px;
					line-height:32px;
				}
				
			}
			.tips-text{
				font-size:12px;
				line-height:1.5;
				color:#999;
			}
			.approver-box-title{
				position:relative;
				
				.delete-approver-btn {
					padding:7px;
					position:absolute;
					font-size:20px;
					top:0;
					right: 0;
					
					&:hover{
						cursor:pointer;
					}
				}
			}
		}
		.group-box{
			background-color:#e6e6e6;
			padding:10px 0 10px 37px;
			margin:0;
			box-sizing: border-box;
			width:100% !important;
			
			.group-content{
				.el-tag{
					margin-right:10px;
					background-color:#FFF;
					color:#666;
				}
			}
			.group-selecter{
				height:32px;
				line-height:32px;
				width:150px;
				
				.el-select__tags{
					height:32px;
					line-height:32px;
					white-space: nowrap;
					word-break: keep-all;
					overflow:hidden;
					text-overflow: ellipsis;
					
					span{
						display:inline;
					}
					.el-tag{
						display: inline;
						background-color:transparent;
						border:none;
						line-height:26px;
						padding:0 4px;
						
						.el-tag__close{
							display:none;
						}
					}
				}
				.el-input__inner{
					height:32px;
					line-height:32px;
				}
				&.disabled *{
					cursor:pointer;
				}
			}
		}
		.operations-box {
			
			.operations-content{
				padding-top:10px;
			}
			.reject-type {
				border:1px solid #c5c5c5;
				margin-left:24px;
				width:241px;
				background-color:#e6e6e6;
				overflow: hidden;
				
				.el-radio-group {
					padding:10px 0 10px 16px;
					width:100%;
				}
				.el-form-item{
					width:241px;
				}
				.reject-label{
					padding:10px 0;
				}
				.group-box{
					padding-left:24px;
				}
			}
			.el-form-item__content{
				line-height: 34px;
				
				.el-checkbox{
					color:#333;
				}
			}
			.need-title {
				
				&>label{
					display:block;
				}
				&>.el-form-item__content{
					padding-left:15px;
				}
			}
			.line-box{
				text-align: left;
				height:40px;
				line-height: 40px;
				
				.line-title {
					position:relative;
					z-index:1;
					background-color:#F0F0F0;
					font-weight:bold;
					padding-right:5px;
				}
				.group-line {
					display:block;
					border-top:1px solid #e0e0e0;
					position:relative;
					top:-20px;
				}
			}
		}
		.form-operation-box{
			padding:20px 0 0 20px;
			width:300px;
			
			.operation-list{
				width:100%;
				border:1px solid #E0E0E0;
				
				.el-table__header-wrapper {
					height:30px;
					line-height:30px;
					
					&th{
						height:30px;
						line-height:30px;
					}
				}
				
				.content-text{
					color:#333;
					padding-left:5px;
				}
			}
			thead th{
				padding:0;
				font-size:14px;
				font-weight:normal;
				line-height:30px;
				background-color:#e6e6e6;
				border-color:#e6e6e6;
				color:#333;
			}
			.el-table{
				
				td {
					border-color:#e6e6e6;
				}
			}
		}
		.condition-box{
			width:300px !important;
			margin:0;
			padding:20px 0 20px 20px;
			
			.condition-set-content{
				color: #333;
				border:1px solid #c5c5c5;
				padding-bottom:10px;
				
				.content-header{
					background-color: #e6e6e6;
					padding:0 10px;
					height:30px;
					line-height:30px;

				}
				.text-tips{
					height:28px;
					line-height: 28px;
					font-size:14px;
					background-color:#FFFBE6 ;
					color:#999;
					border-radius:3px;
					border:1px solid #FFE58F;
					padding:0 10px;
					
					i {
						color: #FAAD14;
					}
					span {
						padding:0 8px;
					}
				}
				.set-content-contianer{
					padding:10px 20px 10px 20px;
					
					.when-text{
						padding:0 15px;
					}
					.content-box-each{
						padding:0;
						font-size:0;
						text-align:left;

						.inner-content{
							padding:0 10px 0 30px;
						}
						
						.el-select,
						.el-input,
						.el-input__inner{
							font-size:14px;
							display: block;
							height:34px;
							line-height:34px;
						}
						.el-select,
						.el-input{
							margin:5px 0;
						}
						.and-or{
							width:62px;
							margin:10px 0;
							
						}
					}
					.add-minus-box{
						height:34px;
						line-height: 34px;
						
						.add-condition{
							
						}
						.minus-condition{
							float:right;
						}
					}
				}
			}
		}
		.el-input__icon{
			line-height: 30px;
		}
		.hr-box{
			display: block;
			width:320px;
			height:1px;
			background-color:#c5c5c5;
		}
		.js-exe-box{
			
			.el-input {
				height:34px;
				line-height:34px;
				width:200px;
				cursor:pointer;
				
				.el-input__inner{
					height:34px;
					line-height:34px;
					cursor:pointer;
				}
			}
			label{
				line-height:30px;
			}
		}
		.code-mirror-box{
			
			.el-dialog__header{
				padding:0 20px;
				background-color:#e6e6e6;
				
				.js-exe-title{
					color:#1F4661;
					font-weight:bold;
				}
				
			}
			.el-dialog__headerbtn{
				top:0;
			}
			.code-mirror-footer{
				display: block;
				text-align: center;
				font-size:0;
				
				.import-btn {
					margin-left:20px;
					background-color:#1977a2;
					border:1px solid #1e89b9;
					&:hover {
						background-color:#1c85b5;
					}
				}
				.code-cancel{
					
					&:hover{
						color:#1977a2;
					}
				}
			}
			.el-dialog__footer{
				padding:0 20px 20px 20px;
				
			}
		}
		
	}
	
}
</style>