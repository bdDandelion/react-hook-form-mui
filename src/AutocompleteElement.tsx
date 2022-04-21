/*
 * @Author: GM20171202
 * @Date: 2022-04-21 14:06:07
 * @Last Modified by: GM20171202
 * @Last Modified time: 2022-04-21 14:25:14
 */
import React from 'react'
import { Controller } from 'react-hook-form'
import type { Control, ControllerProps } from 'react-hook-form'
import Autocomplete from '@mui/material/Autocomplete'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import type { AutocompleteProps } from '@mui/material/Autocomplete'

export type AutocompleteElementProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = 'div'
> = Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>,
  'value' | 'onChange'
> &
  Pick<ControllerProps, 'name' | 'rules'> & {
    control: Control<any, any>
  }

function AutocompleteElement<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = 'div'
>(
  props: AutocompleteElementProps<
    T,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  >
) {
  const { multiple, control, name, rules, ...restProps } = props
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl variant="outlined" fullWidth error={!!error}>
          <Autocomplete<T, Multiple, DisableClearable, FreeSolo>
            fullWidth
            value={value}
            onChange={(__, data) => onChange(data)}
            {...restProps}
          />
          {!!error?.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}

export default AutocompleteElement
