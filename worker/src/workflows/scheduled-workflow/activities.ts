import {Options} from "../../types/activity-options.js";


export function scheduledWorkflowActivities(options: Options)  {
    return {
        async getDate () {
            return new Date().toISOString()
        }
    }
}
