import { isReverse } from './Connect';

var HIGH_PRIORITY = 1100,
    LOW_PRIORITY = 900;

var MARKER_OK = 'connect-ok',
    MARKER_NOT_OK = 'connect-not-ok';

/**
 * Shows connection preview during connect.
 *
 * @param {didi.Injector} injector
 * @param {EventBus} eventBus
 * @param {Canvas} canvas
 */
export default function ConnectPreview(injector, eventBus, canvas) {
  var connectionPreview = injector.get('connectionPreview', false);

  connectionPreview && eventBus.on('connect.move', function(event) {
    var context = event.context,
        canConnect = context.canExecute,
        hover = context.hover,
        source = context.source,
        start = context.start,
        startPosition = context.startPosition,
        connectionStart = context.connectionStart,
        connectionEnd = context.connectionEnd,
        target = context.target;
        
        //兼容火狐浏览器连线预览丢失的问题
    if (!connectionStart || !connectionStart.x || !connectionStart.y) {
      connectionStart = isReverse(context) ? {
        x: event.x,
        y: event.y
      } : ((startPosition && startPosition.x && startPosition.y)?startPosition:{x: start.x+start.width/2,y: start.y+start.height/2});
    }

    if (!connectionEnd || !connectionEnd.x || !connectionEnd.y) {
      connectionEnd = isReverse(context) ? ((startPosition && startPosition.x && startPosition.y)?startPosition:{x: start.x+start.width/2,y: start.y+start.height/2}) : {
        x: event.x,
        y: event.y
      };
    }

    connectionPreview.drawPreview(context, canConnect, {
      source: source || start,
      target: target || hover,
      connectionStart: connectionStart,
      connectionEnd: connectionEnd
    });
  });

  eventBus.on('connect.hover', LOW_PRIORITY, function(event) {
    var context = event.context,
        hover = event.hover,
        canExecute = context.canExecute;

    // ignore hover
    if (canExecute === null) {
      return;
    }

    canvas.addMarker(hover, canExecute ? MARKER_OK : MARKER_NOT_OK);
  });

  eventBus.on([
    'connect.out',
    'connect.cleanup'
  ], HIGH_PRIORITY, function(event) {
    var hover = event.hover;

    if (hover) {
      canvas.removeMarker(hover, MARKER_OK);
      canvas.removeMarker(hover, MARKER_NOT_OK);
    }
  });

  connectionPreview && eventBus.on('connect.cleanup', function(event) {
    connectionPreview.cleanUp(event.context);
  });
}

ConnectPreview.$inject = [
  'injector',
  'eventBus',
  'canvas'
];
