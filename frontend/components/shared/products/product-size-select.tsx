import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProductSizeSelect({ sizes }: { sizes: any[] }) {
  console.log(sizes);
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        Size
      </label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent>
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            sizes.map((size: any) => (
              <SelectItem key={size.Name} value={size.Name}>
                {size.Name}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </div>
  );
}
