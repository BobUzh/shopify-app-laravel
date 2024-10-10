import {
    Page,
    LegacyCard,
    DataTable,
    Spinner,
    Link,
    Tabs,
    Card,
    Text,
    Button,
    LegacyStack,
    Grid,
    BlockStack,
    InlineGrid,
} from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useCallback, useEffect, useState } from "react";
import { ChildrenForBlog } from "../components/ChildrenForBlog";
import { ChildrenAllBlogs } from "../components/ChildrenAllBlogs";

export default function PageName() {
    const { t } = useTranslation();
    const [selected, setSelected] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    const {
        data,
        refetch: refetchProductCount,
        isLoading: isLoadingCount,
        isRefetching: isRefetchingCount,
    } = useAppQuery({
        url: "/api/blogs",
        reactQueryOptions: {
            onSuccess: () => {
                setIsLoading(false);
                let arr = [];
                let url = "https://admin.shopify.com/store/mox-skincare/blogs/";
                console.log(url);

                data?.blogs.map((e) =>
                    arr.push([
                        <Link removeUnderline url={url + e.id}>
                            {e.title}
                        </Link>,
                        "active",
                    ]),
                );
                setBlogs(arr);
            },
        },
    });

    const childrenForBlog = isRefetchingCount ? (
        <Spinner />
    ) : (
        <ChildrenForBlog blogs={blogs} />
    );

    const childrenAllBlogs = <ChildrenAllBlogs />;

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    const tabs = [
        {
            id: "all-customers-fitted-2",
            content: "All",
            children: "All",
            accessibilityLabel: "Filter for all blogs",
            children: childrenAllBlogs,
            panelID: "panelID-1",
        },
        {
            id: "accepts-marketing-fitted-2",
            content: "Blog",
            accessibilityLabel: "Filter for each blog",
            children: childrenForBlog,
            panelID: "panelID-2",
        },
    ];

    console.log(data);

    return (
        <Page title={t("All blogs")}>
            <LegacyCard>
                <Tabs
                    tabs={tabs}
                    selected={selected}
                    onSelect={handleTabChange}
                    fitted
                >
                    <LegacyCard.Section
                        title={tabs[selected].accessibilityLabel}
                    >
                        {tabs[selected].children}
                    </LegacyCard.Section>
                </Tabs>
            </LegacyCard>
        </Page>
    );
}
