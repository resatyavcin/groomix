interface Props {
  url: string;
}

export default function RetrospectiveGifCard(props: Props) {
  return (
    <div class="p-2 border rounded-md shadow-sm bg-gray-50 flex justify-center items-center">
      <img src={props.url} alt="GIF" class="max-h-40 rounded object-contain" loading="lazy" />
    </div>
  );
}
