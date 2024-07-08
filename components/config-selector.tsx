import React from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ConfigSelectorProps {
  configurations: Configuration[] | undefined
  onSelect: (selectedConfigId: string) => void
}

const ConfigSelector: React.FC<ConfigSelectorProps> = ({
  configurations,
  onSelect,
}) => {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a configuration" />
      </SelectTrigger>
      <SelectContent>
        {configurations?.map(config => (
          <SelectItem
            key={config.id}
            value={config.id}
          >
            {config.usesMotor?.[0]?.commonName} {'['}
            {config.validatedBy?.[0].maxaltitude} m -{' '}
            {config.validatedBy?.[0].maxvelocity} m/s{']'}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default ConfigSelector
