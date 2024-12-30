import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import { Brain, Target, MessageCircle, Code, Shield, Rocket } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  role: string;
  parent: string | null;
  level: number;
  status: 'active' | 'busy' | 'idle';
  icon: any;
  performance: number;
  activeTasks: number;
  communications: number;
}

const agents: Agent[] = [
  {
    id: '1',
    name: 'Atlas',
    role: 'Chief AI Orchestrator',
    parent: null,
    level: 1,
    status: 'active',
    icon: Brain,
    performance: 98,
    activeTasks: 42,
    communications: 156
  },
  {
    id: '2',
    name: 'Nova',
    role: 'Strategic Director',
    parent: '1',
    level: 2,
    status: 'busy',
    icon: Target,
    performance: 95,
    activeTasks: 15,
    communications: 89
  },
  {
    id: '3',
    name: 'Echo',
    role: 'Content Strategist',
    parent: '2',
    level: 3,
    status: 'active',
    icon: MessageCircle,
    performance: 92,
    activeTasks: 8,
    communications: 234
  },
  {
    id: '4',
    name: 'Neo',
    role: 'Tech Lead',
    parent: '1',
    level: 2,
    status: 'active',
    icon: Code,
    performance: 96,
    activeTasks: 12,
    communications: 67
  },
  {
    id: '5',
    name: 'Sentinel',
    role: 'Risk Guardian',
    parent: '1',
    level: 2,
    status: 'idle',
    icon: Shield,
    performance: 94,
    activeTasks: 5,
    communications: 45
  }
];

const iconPaths = {
  Brain: 'M9.25 13a.25.25 0 0 0 0 .5h.5a.25.25 0 0 0 0-.5h-.5Z M14.25 13a.25.25 0 0 0 0 .5h.5a.25.25 0 0 0 0-.5h-.5Z M12 16c1.5 0 3-1.5 3-3.5S13.5 9 12 9s-3 1.5-3 3.5 1.5 3.5 3 3.5Z',
  Target: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z M12 18c3.3 0 6-2.7 6-6s-2.7-6-6-6-6 2.7-6 6 2.7 6 6 6Z M12 14c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Z',
  MessageCircle: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z',
  Code: 'M16 18l6-6-6-6 M8 6l-6 6 6 6',
  Shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
};

export default function AgentHierarchyView() {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const width = 1200;
    const height = 800;
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    // Create hierarchical data
    const stratify = d3.stratify<Agent>()
      .id(d => d.id)
      .parentId(d => d.parent);

    const root = stratify(agents)
      .sort((a, b) => (a.data.level - b.data.level) || (a.data.name.localeCompare(b.data.name)));

    const treeLayout = d3.tree<Agent>().size([height - 100, width - 200]);
    const treeData = treeLayout(root);

    // Draw links
    svg.selectAll('.link')
      .data(treeData.links())
      .join('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x))
      .attr('fill', 'none')
      .attr('stroke', '#2E2E2E')
      .attr('stroke-width', 2);

    // Create node groups
    const nodes = svg.selectAll('.node')
      .data(treeData.descendants())
      .join('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`);

    // Node circles
    nodes.append('circle')
      .attr('r', 30)
      .attr('fill', d => {
        const status = d.data.status;
        switch (status) {
          case 'active': return '#00BFA6';
          case 'busy': return '#FF6F00';
          default: return '#7F00FF';
        }
      })
      .attr('stroke', '#1A1A40')
      .attr('stroke-width', 3);

    // Node labels
    nodes.append('text')
      .attr('dy', 50)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .style('font-size', '14px')
      .text(d => d.data.name);

    // Add icons
    nodes.append('path')
      .attr('d', d => {
        const IconComponent = d.data.icon;
        const iconName = IconComponent.displayName;
        return iconPaths[iconName] || '';
      })
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .attr('transform', 'translate(-12, -12) scale(1)');

    // Tooltip interaction
    nodes.on('mouseover', (event, d) => {
      const tooltip = d3.select(tooltipRef.current!);
      tooltip.style('display', 'block')
        .style('left', `${event.pageX + 10}px`)
        .style('top', `${event.pageY + 10}px`);

      setSelectedAgent(d.data);
    })
    .on('mouseout', () => {
      d3.select(tooltipRef.current!).style('display', 'none');
      setSelectedAgent(null);
    });

  }, []);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">AI Agent Hierarchy</h1>
        
        <div className="relative bg-neutral-dark/30 backdrop-blur-sm rounded-lg p-6">
          <svg
            ref={svgRef}
            className="w-full h-[800px]"
          />
          
          {/* Tooltip */}
          <div
            ref={tooltipRef}
            className="absolute hidden bg-[#1A1A40]/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/10"
            style={{ pointerEvents: 'none' }}
          >
            {selectedAgent && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <selectedAgent.icon className="h-5 w-5 text-[#00BFA6]" />
                  <h3 className="text-white font-semibold">{selectedAgent.name}</h3>
                </div>
                <p className="text-sm text-[#00BFA6]">{selectedAgent.role}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Performance:</div>
                  <div className="text-white">{selectedAgent.performance}%</div>
                  <div className="text-gray-400">Active Tasks:</div>
                  <div className="text-white">{selectedAgent.activeTasks}</div>
                  <div className="text-gray-400">Communications:</div>
                  <div className="text-white">{selectedAgent.communications}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}