import * as wf from '@temporalio/workflow'
import {createActivities} from "../../activities.js";

let activities = wf.proxyActivities<ReturnType<typeof createActivities>>({
    startToCloseTimeout: '1 minutes',
    retry: {
        maximumAttempts: 1
    }
})

export async function simpleWorkflow() {
    const randomNumb = Math.floor(Math.random() * 100)
    const result = await activities.simpleActivity(randomNumb)
    return result
}
