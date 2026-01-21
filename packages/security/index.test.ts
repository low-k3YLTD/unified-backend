import { describe, it, expect } from 'vitest';
import { SecurityAudit, AuthConfig } from './index';

describe('SecurityAudit', () => {
  it('should validate manual credentials correctly', async () => {
    const validConfig: AuthConfig = { type: 'manual', credentials: { apiKey: 'secret-key' } };
    const invalidConfig: AuthConfig = { type: 'manual', credentials: {} };
    
    expect(await SecurityAudit.validateConfig(validConfig)).toBe(true);
    expect(await SecurityAudit.validateConfig(invalidConfig)).toBe(false);
  });

  it('should validate oauth credentials correctly', async () => {
    const validConfig: AuthConfig = { type: 'oauth', credentials: { clientId: 'id', clientSecret: 'secret' } };
    const invalidConfig: AuthConfig = { type: 'oauth', credentials: { clientId: 'id' } };
    
    expect(await SecurityAudit.validateConfig(validConfig)).toBe(true);
    expect(await SecurityAudit.validateConfig(invalidConfig)).toBe(false);
  });

  it('should return audit logs', async () => {
    const logs = await SecurityAudit.auditLogs();
    expect(logs).toContain('Audit started');
    expect(logs.length).toBeGreaterThan(0);
  });
});
