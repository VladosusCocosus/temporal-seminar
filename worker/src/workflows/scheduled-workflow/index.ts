import * as wf from '@temporalio/workflow'
import {createActivities} from "../../activities.js";

let activities = wf.proxyActivities<ReturnType<typeof createActivities>>({
    startToCloseTimeout: '1 minutes',
    retry: {
        maximumAttempts: 1
    }
})

export async function scheduledWorkflow () {
    return await activities.getDate()
}
