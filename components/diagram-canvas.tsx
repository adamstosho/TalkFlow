"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NodeCard } from "@/components/node-card"
import type { ViewMode } from "@/app/meeting/page"
import { Brain, GitBranch, List, ZoomIn, ZoomOut, RotateCcw, Move, Edit3, X } from "lucide-react"

interface DiagramCanvasProps {
  transcript: string[]
  viewMode: ViewMode
}

interface DiagramNode {
  id: string
  text: string
  x: number
  y: number
  level: number
  connections: string[]
  nodeType?: "start" | "process" | "decision" | "end"
  width?: number
  height?: number
  isEditing?: boolean
}

export function DiagramCanvas({ transcript, viewMode }: DiagramCanvasProps) {
  const [nodes, setNodes] = useState<DiagramNode[]>([])
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Generate nodes from transcript with better positioning
    const newNodes: DiagramNode[] = transcript.map((line, index) => {
      const words = line.split(" ")
      const isMainIdea = words.length > 8 || line.includes("project") || line.includes("goal") || line.includes("plan")
      const isDecision = line.toLowerCase().includes("if") || line.toLowerCase().includes("whether") || line.toLowerCase().includes("decide")
      const isStart = index === 0
      const isEnd = index === transcript.length - 1

      let x, y, nodeType: DiagramNode["nodeType"]
      
      switch (viewMode) {
        case "mindmap":
          // Radial layout for mind map - responsive positioning
          const angle = (index * 60) % 360
          const radius = 150 + (index * 40) // Smaller radius for better mobile fit
          x = 300 + Math.cos((angle * Math.PI) / 180) * radius
          y = 250 + Math.sin((angle * Math.PI) / 180) * radius
          nodeType = "process"
          break
          
        case "flowchart":
          // Professional flowchart layout - responsive
          const centerX = 400
          const startY = 80
          const stepY = 150 // Reduced spacing for mobile
          const maxWidth = 600 // Reduced for better mobile fit
          
          if (isStart) {
            x = centerX
            y = startY
            nodeType = "start"
          } else if (isEnd) {
            x = centerX
            y = startY + (index * stepY)
            nodeType = "end"
          } else if (isDecision) {
            // Decisions alternate left and right
            const side = Math.floor(index / 2) % 2 === 0 ? 1 : -1
            x = centerX + (side * 250) // Reduced offset
            y = startY + (index * stepY)
            nodeType = "decision"
          } else {
            // Regular processes
            const side = Math.floor(index / 2) % 2 === 0 ? 1 : -1
            x = centerX + (side * 180) // Reduced offset
            y = startY + (index * stepY)
            nodeType = "process"
          }
          break
          
        case "outline":
          // Linear layout for outline - responsive
          x = 80
          y = 80 + index * 80 // Reduced spacing
          nodeType = "process"
          break
          
        default:
          x = 200 + index * 50
          y = 200 + index * 50
          nodeType = "process"
      }

      return {
        id: `node-${index}`,
        text: line,
        x,
        y,
        level: Math.floor(index / 3),
        connections: index > 0 ? [`node-${index - 1}`] : [],
        nodeType,
        width: 200,
        height: 80,
        isEditing: false,
      }
    })

    setNodes(newNodes)
  }, [transcript, viewMode])

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5))
  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && !draggedNode && !selectedNode) { // Left click only, no node interaction
      setIsDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isDragging && !draggedNode) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleCanvasMouseUp = () => {
    setIsDragging(false)
    setDraggedNode(null)
  }

  const handleNodeMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation()
    const node = nodes.find(n => n.id === nodeId)
    if (!node) return

    setDraggedNode(nodeId)
    setSelectedNode(nodeId)
    setDragStart({ 
      x: e.clientX - node.x, 
      y: e.clientY - node.y 
    })
  }, [nodes])

  const handleNodeMouseMove = useCallback((e: React.MouseEvent) => {
    if (draggedNode) {
      e.preventDefault()
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      
      setNodes(prev => prev.map(node => 
        node.id === draggedNode 
          ? { ...node, x: newX, y: newY }
          : node
      ))
    }
  }, [draggedNode, dragStart])

  const handleNodeMouseUp = useCallback(() => {
    setDraggedNode(null)
  }, [])

  const handleNodeDoubleClick = useCallback((nodeId: string) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, isEditing: true }
        : node
    ))
  }, [])

  const handleNodeEdit = useCallback((nodeId: string, newText: string) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, text: newText, isEditing: false }
        : node
    ))
  }, [])

  const handleNodeEditCancel = useCallback((nodeId: string) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, isEditing: false }
        : node
    ))
  }, [])

  const handleResizeStart = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation()
    const node = nodes.find(n => n.id === nodeId)
    if (!node) return

    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: node.width || 200,
      height: node.height || 80
    })
  }, [nodes])

  const handleResizeMove = useCallback((e: React.MouseEvent) => {
    if (isResizing && selectedNode) {
      e.preventDefault()
      const deltaX = e.clientX - resizeStart.x
      const deltaY = e.clientY - resizeStart.y
      
      setNodes(prev => prev.map(node => 
        node.id === selectedNode 
          ? { 
              ...node, 
              width: Math.max(100, resizeStart.width + deltaX),
              height: Math.max(60, resizeStart.height + deltaY)
            }
          : node
      ))
    }
  }, [isResizing, selectedNode, resizeStart])

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false)
  }, [])

  const handleNodeSelect = useCallback((nodeId: string) => {
    setSelectedNode(nodeId)
  }, [])

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedNode(null)
    }
  }, [])

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleNodeMouseMove(e as any)
      handleResizeMove(e as any)
    }

    const handleGlobalMouseUp = () => {
      handleNodeMouseUp()
      handleResizeEnd()
    }

    if (draggedNode || isResizing) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [draggedNode, isResizing, handleNodeMouseMove, handleNodeMouseUp, handleResizeMove, handleResizeEnd])

  const getViewIcon = () => {
    switch (viewMode) {
      case "mindmap":
        return <Brain className="w-5 h-5" />
      case "flowchart":
        return <GitBranch className="w-5 h-5" />
      case "outline":
        return <List className="w-5 h-5" />
    }
  }

  const getViewTitle = () => {
    switch (viewMode) {
      case "mindmap":
        return "Mind Map View"
      case "flowchart":
        return "Flowchart View"
      case "outline":
        return "Outline View"
    }
  }

  const getConnectionPath = (startX: number, startY: number, endX: number, endY: number, nodeType?: string) => {
    if (viewMode === "flowchart") {
      // Create curved paths for flowchart
      const midX = (startX + endX) / 2
      const midY = (startY + endY) / 2
      
      if (nodeType === "decision") {
        // For decisions, create a more complex path
        const controlX1 = startX + (endX - startX) * 0.3
        const controlY1 = startY
        const controlX2 = endX - (endX - startX) * 0.3
        const controlY2 = endY
        return `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`
      } else {
        // For regular processes, use straight lines with slight curve
        return `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`
      }
    }
    
    // Default straight line for other views
    return `M ${startX} ${startY} L ${endX} ${endY}`
  }

  return (
    <div className="relative w-full h-full bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Canvas Container */}
      <div
        ref={canvasRef}
        className="w-full h-full relative cursor-grab active:cursor-grabbing"
        data-canvas="true"
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onWheel={handleWheel}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center',
        }}
      >
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map((node) =>
            node.connections.map((connectionId) => {
              const connectedNode = nodes.find((n) => n.id === connectionId)
              if (!connectedNode) return null

              const startX = connectedNode.x + (connectedNode.width || 200) / 2
              const startY = connectedNode.y + (connectedNode.height || 80) / 2
              const endX = node.x + (node.width || 200) / 2
              const endY = node.y + (node.height || 80) / 2

              return (
                <g key={`${node.id}-${connectionId}`}>
                  <path
                    d={getConnectionPath(startX, startY, endX, endY, node.nodeType)}
                    stroke="rgb(148 163 184)"
                    strokeWidth="2"
                    fill="none"
                    className="dark:stroke-slate-600"
                  />
                  {/* Arrow head for flowchart */}
                  {viewMode === "flowchart" && (
                    <polygon
                      points={`${endX - 8},${endY - 4} ${endX},${endY} ${endX - 8},${endY + 4}`}
                      fill="rgb(148 163 184)"
                      className="dark:fill-slate-600"
                    />
                  )}
                </g>
              )
            })
          )}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute transition-all duration-200 ${
              selectedNode === node.id ? 'z-20' : 'z-10'
            }`}
            style={{
              left: node.x,
              top: node.y,
              width: node.width,
              height: node.height,
            }}
            onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
            onDoubleClick={(e) => handleNodeDoubleClick(e, node.id)}
            onClick={(e) => handleNodeClick(e, node.id)}
          >
            <NodeCard
              text={node.text}
              nodeType={node.nodeType}
              isSelected={selectedNode === node.id}
              isEditing={node.isEditing}
              onEdit={(text) => handleNodeEdit(node.id, text)}
              onEditCancel={() => handleNodeEditCancel(node.id)}
              onResizeStart={handleResizeStart}
            />
          </div>
        ))}
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 left-4 flex flex-col space-y-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={handleZoomIn}
          className="w-10 h-10 p-0 shadow-lg"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleZoomOut}
          className="w-10 h-10 p-0 shadow-lg"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleReset}
          className="w-10 h-10 p-0 shadow-lg"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* View Mode Indicator */}
      <div className="absolute top-4 left-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg px-3 py-2 flex items-center space-x-2">
          {getViewIcon()}
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            {getViewTitle()}
          </span>
        </div>
      </div>

      {/* Instructions */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              {getViewIcon()}
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 font-['Lexend_Deca']">
              Start Your {getViewTitle()}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Begin speaking to see your ideas visualized as a {viewMode === "mindmap" ? "mind map" : viewMode === "flowchart" ? "flowchart" : "outline"}.
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-500 space-y-1">
              <p>• Drag nodes to reposition them</p>
              <p>• Double-click to edit text</p>
              <p>• Use mouse wheel to zoom</p>
              <p>• Drag canvas to pan around</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
