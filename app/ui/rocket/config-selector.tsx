import { Description, Field, Label } from '../fieldset'
import { Listbox, ListboxOption } from '../listbox'
import React from 'react'

interface ConfigSelectorProps {
  configurations: Configuration[] | undefined
  onSelect: (selectedConfigId: string) => void
}

const ConfigSelector: React.FC<ConfigSelectorProps> = ({
  configurations,
  onSelect
}) => {
  // Determine the default value based on the first configuration's ID
  const defaultValue =
    configurations != null && configurations.length > 0
      ? configurations[0].id
      : undefined

  return (
    <Field>
      <Label>Design Configurations</Label>
      <Description>Configurations apply specific motors to a design.</Description>

      <Listbox
        onChange={onSelect}
        defaultValue={defaultValue} // Set the initial value for the Listbox
      >
        {configurations?.map((config) => (
          <ListboxOption key={config.id} value={config.id}>
            {config.name}
          </ListboxOption>
        ))}
      </Listbox>
    </Field>
  )
}

export default ConfigSelector
