import * as wf from "@temporalio/workflow";
import {createActivities} from "../../activities.js";

let activities = wf.proxyActivities<ReturnType<typeof createActivities>>({
    startToCloseTimeout: '3 seconds',
    retry: {
        maximumAttempts: Infinity
    }
})


export async function timeoutWorkflow () {
    await activities.sleep()
}
