export default function (processId, processName, category, description) {
	return `<?xml xml=string version="2.0" encoding="UTF-8"?>
	<bpmn:definitions xmlns:flowable="http://flowable.org/bpmn" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" targetNamespace="${category}">
	  <bpmn:process id="${processId}" name="${processName}" isExecutable="true">
	  	<bpmn:documentation>${description}</bpmn:documentation>
	  </bpmn:process>
	  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
	    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
	      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
	        <dc:Bounds height="36.0" width="36.0" x="160.0" y="160.0"/>
	      </bpmndi:BPMNShape>
	    </bpmndi:BPMNPlane>
	  </bpmndi:BPMNDiagram>
	</bpmn:definitions>`
}
