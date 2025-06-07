// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditorJsRenderer({ data }: { data: any[] }) {
  if (!Array.isArray(data)) return null;

  return (
    <div className="text-gray-700 leading-relaxed">
      {data.map((block, idx) => {
        if (block.type === "paragraph" && Array.isArray(block.children)) {
          return (
            <p key={idx}>
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                block.children.map((child: any) => child.text).join("")
              }
            </p>
          );
        }
        // Add more block types as needed
        return null;
      })}
    </div>
  );
}
