import * as dotenv from "dotenv";
import { Client, Connection } from '@temporalio/client';

dotenv.config()

const connection = await Connection.connect({
    address: process.env.TEMPORAL_URL
})

const client = new Client({
    connection: connection,
})

async function runSimpleWorkflow () {
    await client.workflow.start('simpleWorkflow', {
        taskQueue: 'default',
        workflowId: 'simple-workflow'
    })
}

async function runScheduledWorkflow () {
    await client.schedule.create({
        action: {
            type: 'startWorkflow',
            workflowType: 'scheduledWorkflow',
            args: [],
            taskQueue: 'default',
            workflowId: 'scheduled-workflow'
        },
        scheduleId: 'scheduled-workflow',
        spec: { intervals: [{ every: '30s' }] },
    })
}

async function runChildWorkflow () {
    await client.workflow.start('childWorkflow', {
        taskQueue: 'default',
        workflowId: 'childWorkflow'
    })
    return
}

async function runTimeoutWorkflow () {
    await client.workflow.start('timeoutWorkflow', {
        taskQueue: 'default',
        workflowId: 'timeout-workflow'
    })
}


// runSimpleWorkflow()
//     .catch(e => {
//         console.error(e)
//     })
//
// runScheduledWorkflow()
//     .catch(e => {
//         console.error(e)
//     })
//
runChildWorkflow()
    .catch(e => {
        console.error(e)
    })

// runTimeoutWorkflow()
//     .catch(e => {
//         console.error(e)
//     })
