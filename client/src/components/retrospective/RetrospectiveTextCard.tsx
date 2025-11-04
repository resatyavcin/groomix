interface Props {
  text: string;
}

export default function RetrospectiveTextCard(props: Props) {
  return (
    <div class="p-3 border! border-gray-100 rounded-md bg-blue-50 whitespace-pre-wrap break-words text-sm leading-snug">
      <p>{props.text}</p>
    </div>
  );
}
