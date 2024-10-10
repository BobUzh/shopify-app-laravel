import { DataTable } from "@shopify/polaris";

export function ChildrenForBlog({ blogs }) {
    return (
        <DataTable
            columnContentTypes={["string", "string"]}
            headings={["Blog name", "Status"]}
            rows={blogs}
        />
    );
}
