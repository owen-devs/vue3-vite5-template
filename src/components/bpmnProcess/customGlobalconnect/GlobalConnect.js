var MARKER_OK = 'connect-ok',
    MARKER_NOT_OK = 'connect-not-ok';

/**
 * @class
 * @constructor
 *
 * @param {EventBus} eventBus
 * @param {Dragging} dragging
 * @param {Connect} connect
 * @param {Canvas} canvas
 * @param {ToolManager} toolManager
 * @param {Rules} rules
 */
export default function GlobalConnect(
    eventBus, dragging, connect,
    canvas, toolManager, rules) {

  var self = this;

  this._dragging = dragging;
  this._rules = rules;
  this._toolManager = toolManager;
  this._connect = connect;
  this._eventBus = eventBus;

  toolManager.registerTool('global-connect', {
    tool: 'global-connect',
    dragging: 'global-connect.drag'
  });

  eventBus.on('global-connect.hover', function(event) {
    var context = event.context,
        startTarget = event.hover;

    var canStartConnect = context.canStartConnect = self.canStartConnect(startTarget);
    // simply ignore hover
    if (canStartConnect === null) {
      return;
    }
	
    context.startTarget = startTarget;

    canvas.addMarker(startTarget, canStartConnect ? MARKER_OK : MARKER_NOT_OK);
  });


  eventBus.on([ 'global-connect.out', 'global-connect.cleanup' ], function(event) {

    var startTarget = event.context.startTarget,
        canStartConnect = event.context.canStartConnect;
    if (startTarget) {
      canvas.removeMarker(startTarget, canStartConnect ? MARKER_OK : MARKER_NOT_OK);
    }
  });

//全局连线功能失效
  eventBus.on([ 'global-connect.ended' ], function(event) {
    var context = event.context,
        startTarget = context.startTarget,
        startPosition = {
          x: event.x,
          y: event.y
        };

    var canStartConnect = self.canStartConnect(startTarget);
    if (!canStartConnect) {
      return;
    }
    eventBus.once('element.out', function(outevent) {
      	eventBus.once([ 'connect.ended', 'connect.canceled' ], function(endevent) {
	        eventBus.fire('global-connect.drag.ended');
			self.restart(endevent);
	    });
      	connect.start(null, startTarget, startPosition);
    });
    return false;
  });
}

GlobalConnect.$inject = [
  'eventBus',
  'dragging',
  'connect',
  'canvas',
  'toolManager',
  'rules'
];
//重启全局连线功能
GlobalConnect.prototype.restart = function(event) {
	
    var self = this;
    var startTarget = event.hover,
	    startPosition = {
	      x: event.x,
	      y: event.y
	    };
	var canStartConnect = self.canStartConnect(startTarget);

    if(!startTarget || startTarget.type=='bpmn:Process' || !canStartConnect){
    	this._eventBus.fire('global-connect.drag.ended');
    	return;
    }else{
    	this.setActive('global-connect');
    }
    this._eventBus.once('element.out', function(outevent) {
    	if(startTarget.type=='bpmn:Process' || outevent.element.type=='bpmn:Process'){
	    	return;
	    }
      	self._eventBus.once([ 'connect.ended', 'connect.canceled' ], function(endevent) {
			canStartConnect = self.canStartConnect(endevent.hover);
	        self.restart(endevent);
	    });
		self._connect.start(null, startTarget, startPosition);
    });
    
	
};
/**
 * Initiates tool activity.
 */
GlobalConnect.prototype.start = function(event,options) {
  this._dragging.init(event, 'global-connect', options || {
    trapClick: false,
    data: {
      context: {}
    }
  });
};

GlobalConnect.prototype.toggle = function() {
  if(this.isActive()) {
    this._dragging.cancel();
  } else {
    this.start();
  }
};
GlobalConnect.prototype.setActive = function(name) {

 this._toolManager.setActive(name)
  
};
GlobalConnect.prototype.isActive = function() {
  var context = this._dragging.context();
  return context && /^global-connect/.test(context.prefix);
};

/**
 * Check if source shape can initiate connection.
 *
 * @param  {Shape} startTarget
 * @return {boolean}
 */
GlobalConnect.prototype.canStartConnect = function(startTarget) {
  return this._rules.allowed('connection.start', { source: startTarget });
};
