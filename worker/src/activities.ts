import {simpleWorkflowActivities} from "./workflows/simple-workflow/activities.js";
import {scheduledWorkflowActivities} from "./workflows/scheduled-workflow/activities.js";
import {Options} from "./types/activity-options.js";
import {timeoutWorkflowActivities} from "./workflows/timeout-workflow/activities.js";



export function createActivities(options: Options) {
    return {
        ...simpleWorkflowActivities(options),
        ...scheduledWorkflowActivities(options),
        ...timeoutWorkflowActivities(options)
    }
}
