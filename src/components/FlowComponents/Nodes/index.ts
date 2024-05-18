import type { Node, NodeTypes } from 'reactflow'
import { PositionLoggerNode } from './PositionLoggerNode'
import MessageNode from '@/components/FlowComponents/Nodes/MessageNode'

export const initialNodes = [
  {
    id: '1',
    type: 'messageNode',
    position: { x: 50, y: 200 },
    data: { heading: 'Send Message', content: 'This is text 1' },
  },
  {
    id: '2',
    type: 'messageNode',
    position: { x: 300, y: 100 },
    data: { heading: 'Send Message', content: 'This is text 2' },
  },
] satisfies Node[]

export const nodeTypes = {
  messageNode: MessageNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes
