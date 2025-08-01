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
          // Radial layout for mind map
          const angle = (index * 60) % 360
          const radius = 200 + (index * 50)
          x = 400 + Math.cos((angle * Math.PI) / 180) * radius
          y = 300 + Math.sin((angle * Math.PI) / 180) * radius
          nodeType = "process"
          break
          
        case "flowchart":
          // Professional flowchart layout
          const centerX = 500
          const startY = 100
          const stepY = 180
          const maxWidth = 800
          
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
            x = centerX + (side * 300)
            y = startY + (index * stepY)
            nodeType = "decision"
          } else {
            // Regular processes
            const side = Math.floor(index / 2) % 2 === 0 ? 1 : -1
            x = centerX + (side * 200)
            y = startY + (index * stepY)
            nodeType = "process"
          }
          break
          
        case "outline":
          // Linear layout for outline
          x = 100
          y = 100 + index * 100
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
        level: isMainIdea ? 0 : 1,
        connections: index > 0 ? [`node-${index - 1}`] : [],
        nodeType,
        width: viewMode === "flowchart" && nodeType === "decision" ? 160 : 200,
        height: viewMode === "flowchart" && nodeType === "decision" ? 160 : 80,
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
    <div 
      className="h-full bg-slate-50 dark:bg-slate-900 relative overflow-hidden"
      ref={canvasRef}
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleCanvasMouseMove}
      onMouseUp={handleCanvasMouseUp}
      onMouseLeave={handleCanvasMouseUp}
      onClick={handleCanvasClick}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Canvas Header */}
      <div className="absolute top-4 left-4 z-20">
        <Card className="px-3 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center space-x-2">
            {getViewIcon()}
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{getViewTitle()}</span>
          </div>
        </Card>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-20">
        <Card className="p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              className="h-8 w-8 p-0"
              disabled={zoom <= 0.5}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-xs text-slate-600 dark:text-slate-400 min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              className="h-8 w-8 p-0"
              disabled={zoom >= 3}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-8 w-8 p-0"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Canvas Content */}
      <div 
        className="absolute inset-0 p-8 transition-transform duration-200"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center',
        }}
      >
        {nodes.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                {getViewIcon()}
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Your diagram will appear here</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                Start speaking to see your ideas transform into a visual {viewMode.replace("mindmap", "mind map")}
              </p>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full min-h-[800px]">
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {nodes.map((node) =>
                node.connections.map((connectionId) => {
                  const connectedNode = nodes.find((n) => n.id === connectionId)
                  if (!connectedNode) return null

                  const startX = node.x + (node.width || 200) / 2
                  const startY = node.y + (node.height || 80) / 2
                  const endX = connectedNode.x + (connectedNode.width || 200) / 2
                  const endY = connectedNode.y + (connectedNode.height || 80) / 2

                  return (
                    <g key={`${node.id}-${connectionId}`}>
                      <path
                        d={getConnectionPath(startX, startY, endX, endY, node.nodeType)}
                        stroke={viewMode === "mindmap" ? "#0EA5E9" : viewMode === "flowchart" ? "#4F46E5" : "#F59E0B"}
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={viewMode === "outline" ? "5,5" : "0"}
                        className="opacity-60"
                      />
                      {/* Arrow for flowchart */}
                      {viewMode === "flowchart" && (
                        <polygon
                          points={`${endX - 10},${endY - 5} ${endX},${endY} ${endX - 10},${endY + 5}`}
                          fill="#4F46E5"
                          className="opacity-60"
                        />
                      )}
                    </g>
                  )
                }),
              )}
            </svg>

            {/* Nodes */}
            {nodes.map((node, index) => (
              <div
                key={node.id}
                className="absolute transition-all duration-300 ease-out"
                style={{
                  left: node.x,
                  top: node.y,
                  width: node.width,
                  height: node.height,
                  animationDelay: `${index * 200}ms`,
                  zIndex: selectedNode === node.id ? 10 : 1,
                }}
                onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                onDoubleClick={() => handleNodeDoubleClick(node.id)}
                onClick={() => handleNodeSelect(node.id)}
              >
                <NodeCard 
                  text={node.text} 
                  level={node.level} 
                  viewMode={viewMode} 
                  isNew={index === nodes.length - 1}
                  nodeType={node.nodeType}
                  isSelected={selectedNode === node.id}
                  isEditing={node.isEditing}
                  onEdit={(newText) => handleNodeEdit(node.id, newText)}
                  onEditCancel={() => handleNodeEditCancel(node.id)}
                  onResizeStart={(e) => handleResizeStart(e, node.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center',
        }}
      />

      {/* Instructions */}
      {nodes.length > 0 && (
        <div className="absolute bottom-4 left-4 z-20">
          <Card className="px-3 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400">
              <Move className="w-4 h-4" />
              <span>Drag to pan • Click nodes to select • Double-click to edit</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
