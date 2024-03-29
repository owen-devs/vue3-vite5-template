import customTranslate from '@/components/bpmnProcess/customTranslate/customTranslate';
import flowableDescriptor from '@/components/bpmnProcess/properties-panel/descriptor/flowable.json';
import flowableMoudle from '@/components/bpmnProcess/properties-panel/extension-moddle/flowable';

export default{
	data(){
		return{
			
		}
	},
	methods:{
		async getViewer(){
			const {CustomModeler} = await require('@/components/bpmnProcess/customModeler')
			let modeler = await new CustomModeler({
				container: this.$refs.bpmnbox,
				height: '100%',
				moddleExtensions: {
					flowable: flowableDescriptor
				},
				additionalModules: [
					flowableMoudle,
					{
						translate: ['value', customTranslate],
						paletteProvider:["value",''],
						labelEditingProvider:["value",''],
						contextPadProvider:["value",''],
						bendpoints:["value",{}],
						zoomScroll:["value",''],
						moveCanvas:['value',''],
						move:['value','']
					}
				]
			})
			return modeler
		}
	}
}
