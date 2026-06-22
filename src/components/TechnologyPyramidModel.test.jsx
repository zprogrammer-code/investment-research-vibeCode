import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TechnologyPyramidModel from './TechnologyPyramidModel.jsx';

describe('TechnologyPyramidModel', () => {
  it('renders the main heading', () => {
    render(<TechnologyPyramidModel />);
    expect(
      screen.getByText('Structural Technology Value Stack (1950–Present)')
    ).toBeInTheDocument();
  });

  it('renders the value stack model label', () => {
    render(<TechnologyPyramidModel />);
    expect(screen.getByText('Value stack model')).toBeInTheDocument();
  });

  it('renders all five layer labels', () => {
    render(<TechnologyPyramidModel />);
    const layerNames = [
      'LAYER 5: Sovereign Automation',
      'LAYER 4: Intelligent Platforms',
      'LAYER 3: Strategic Infrastructure',
      'LAYER 2: Advanced Compute Silicon',
      'LAYER 1: Manufacturing & Lithography',
    ];
    for (const name of layerNames) {
      expect(screen.getAllByText(name).length).toBeGreaterThan(0);
    }
  });

  it('renders all bottleneck names', () => {
    render(<TechnologyPyramidModel />);
    const bottlenecks = [
      'Autonomy Stack Integration',
      'Ecosystem Lock-In',
      'Orbital & Cloud Capacity',
      'High-Bandwidth Memory (HBM)',
      'EUV Lithography Exposure',
    ];
    for (const bn of bottlenecks) {
      expect(screen.getAllByText(bn).length).toBeGreaterThan(0);
    }
  });

  it('renders companies for each layer', () => {
    render(<TechnologyPyramidModel />);
    const companies = [
      'Tesla (USA)',
      'Alphabet (USA)',
      'Palantir (USA)',
      'Microsoft (USA)',
      'Apple (USA)',
      'Amazon (USA)',
      'Lockheed Martin (USA)',
      'SpaceX (USA)',
      'Nvidia (USA)',
      'ARM (UK)',
      'TSMC (Taiwan)',
      'ASML (Netherlands)',
    ];
    for (const company of companies) {
      expect(screen.getAllByText(company).length).toBeGreaterThan(0);
    }
  });

  it('renders the CHIPS and Science Act footer', () => {
    render(<TechnologyPyramidModel />);
    expect(
      screen.getByText('Foundations of Security: Main Goals of the CHIPS and Science Act')
    ).toBeInTheDocument();
  });

  it('renders all four CHIPS goals', () => {
    render(<TechnologyPyramidModel />);
    expect(
      screen.getByText(/Onshore leading-edge fabrication/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Accelerate R&D and workforce pipelines/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Secure allied supply chains/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Align semiconductor policy/)
    ).toBeInTheDocument();
  });

  it('renders structural risk description', () => {
    render(<TechnologyPyramidModel />);
    expect(
      screen.getByText(/Five structural layers from manufacturing foundations/)
    ).toBeInTheDocument();
  });

  it('has accessible aria-labelledby on the section', () => {
    render(<TechnologyPyramidModel />);
    const section = screen.getByRole('region', { name: /Structural Technology Value Stack/i });
    expect(section).toBeInTheDocument();
  });
});
