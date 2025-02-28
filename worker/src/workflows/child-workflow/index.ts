import * as wf from '@temporalio/workflow'
import { simpleWorkflow } from "../simple-workflow/index.js";
import {scheduledWorkflow} from "../scheduled-workflow/index.js";


export async function childWorkflow() {
    console.log('enter', new Date().toISOString())
    const result = await wf.executeChild(simpleWorkflow)

    if (!result.success) {
        throw new Error('Something went wrong!')
    }

    await wf.sleep(15_000)

    console.log('after sleep', new Date().toISOString())

    const promises: unknown[] = []

    for (let i = 0; i < result.numb;  i++) {
        promises.push(
            wf.executeChild(scheduledWorkflow)
        )
    }

    return await Promise.all(promises)
}
