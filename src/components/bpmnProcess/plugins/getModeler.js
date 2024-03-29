import customTranslate from '@/components/bpmnProcess/customTranslate/customTranslate';
import flowableDescriptor from '@/components/bpmnProcess/properties-panel/descriptor/flowable.json';
import flowableMoudle from '@/components/bpmnProcess/properties-panel/extension-moddle/flowable';

export default{
	data(){
		return{
			
		}
	},
	methods:{
		async getModeler(){
			const {CustomModeler} = await require('@/components/bpmnProcess/customModeler')
					
			let modeler = await new CustomModeler({
				container: this.$refs.bpmnbox,
				paletteContainer: this.$refs.paletteBox,
				keyboard: {
					bindTo: window
				},
				height: '100%',
				moddleExtensions: {
					flowable: flowableDescriptor
				},
				additionalModules: [
					flowableMoudle, 
					{ //汉化
						translate: ['value', customTranslate]
					},
					{
						// 禁用滚轮滚动
						zoomScroll: ["value", ""]
					}
				]
			})
			return modeler
		}
	}
}
