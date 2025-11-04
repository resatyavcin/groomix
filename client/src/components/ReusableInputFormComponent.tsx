import { Button, FormControl, FormLabel, FormHelperText, Input, Flex, Center } from '@hope-ui/solid';
import { Show, For } from 'solid-js';

type FormField = {
  id: string;
  label: string;
  type?: string;
  value: string;
  helperText?: string;
  required?: boolean;
  onChange?: (e: any) => void;
};

type Props = {
  fields: FormField[];
  buttonText: string;
  onSubmit?: (e: any) => void;
};

const ReusableInputFormComponent = (props: Props) => {
  return (
    <Flex color="white" direction="column" gap="$4" mb="$4" mt="$4">
      <For each={props.fields}>
        {(field) => (
          <Center w="400px">
            <FormControl required={field.required}>
              <FormLabel for={field.id}>{field.label}</FormLabel>
              <Input id={field.id} type={field.type || 'text'} value={field.value} onChange={field.onChange} />
              <Show when={field.helperText}>
                <FormHelperText>{field.helperText}</FormHelperText>
              </Show>
            </FormControl>
          </Center>
        )}
      </For>

      <Center w="400px">
        <Button colorScheme="accent" style={{ width: '100%' }} onClick={props.onSubmit}>
          {props.buttonText}
        </Button>
      </Center>
    </Flex>
  );
};

export default ReusableInputFormComponent;
