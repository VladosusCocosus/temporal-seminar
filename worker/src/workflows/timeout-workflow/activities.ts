import {Options} from "../../types/activity-options.js";


export function timeoutWorkflowActivities(options: Options)  {
    return {
        async sleep () {
            await new Promise((resolve) => setTimeout(resolve, 10_000));
        }
    }
}
