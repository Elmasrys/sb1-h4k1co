import React, { useState } from 'react';
import { Key, Check, AlertTriangle } from 'lucide-react';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import { Alert } from '../../common/Alert';
import { useApi } from '../../../hooks/useApi';

interface APISettingsProps {
  onComplete?: () => void;
}

export default function APISettings({ onComplete }: APISettingsProps) {
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    anthropic: '',
    stripe: ''
  });
  const [validationStatus, setValidationStatus] = useState<Record<string, boolean>>({});
  const { request, loading, error } = useApi();

  const validateAndSaveKey = async (provider: string, key: string) => {
    try {
      await request({
        url: '/api/validate-key',
        method: 'POST',
        data: { provider, key }
      });
      
      setValidationStatus(prev => ({
        ...prev,
        [provider]: true
      }));
      
      return true;
    } catch (err) {
      setValidationStatus(prev => ({
        ...prev,
        [provider]: false
      }));
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validations = await Promise.all(
      Object.entries(apiKeys).map(([provider, key]) => 
        key ? validateAndSaveKey(provider, key) : Promise.resolve(true)
      )
    );

    if (validations.every(Boolean)) {
      onComplete?.();
    }
  };

  return (
    <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6">
      <div className="flex items-center mb-6">
        <Key className="h-5 w-5 text-[#72f68e] mr-2" />
        <h2 className="text-xl font-semibold text-white">API Configuration</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert
            type="error"
            message={error instanceof Error ? error.message : 'Failed to save API keys'}
          />
        )}

        <Input
          label="OpenAI API Key"
          value={apiKeys.openai}
          onChange={(e) => setApiKeys(prev => ({ ...prev, openai: e.target.value }))}
          type="password"
          placeholder="sk-..."
          error={validationStatus.openai === false ? 'Invalid API key' : undefined}
        />

        <Input
          label="Anthropic API Key"
          value={apiKeys.anthropic}
          onChange={(e) => setApiKeys(prev => ({ ...prev, anthropic: e.target.value }))}
          type="password"
          placeholder="sk-ant-..."
          error={validationStatus.anthropic === false ? 'Invalid API key' : undefined}
        />

        <Input
          label="Stripe API Key"
          value={apiKeys.stripe}
          onChange={(e) => setApiKeys(prev => ({ ...prev, stripe: e.target.value }))}
          type="password"
          placeholder="sk_..."
          error={validationStatus.stripe === false ? 'Invalid API key' : undefined}
        />

        <Button
          type="submit"
          loading={loading}
          icon={Check}
        >
          Save API Keys
        </Button>
      </form>
    </div>
  );
}