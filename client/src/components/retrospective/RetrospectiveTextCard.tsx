interface Props {
  text: string;
}

export default function RetrospectiveTextCard(props: Props) {
  return (
    <div class="p-3 border! border-gray-100 rounded-md bg-blue-50 whitespace-pre-wrap wrap-break-word text-sm leading-snug">
      <p>{props.text}</p>
    </div>
  );
}
