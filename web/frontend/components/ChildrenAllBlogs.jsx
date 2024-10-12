import React, { useEffect, useState } from "react";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { Box, Button, Text } from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";

export function ChildrenAllBlogs() {
    const app = useAppBridge();
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <Box
                padding="100"
                borderWidth="025"
                borderRadius="100"
                borderColor="bg-surface-tertiary-active"
            >
                <Button
                    fullWidth
                    icon={PlusIcon}
                    variant="plan"
                    textAlign="ctart"
                    onClick={() => setModalOpen(true)}
                >
                    Select Source
                </Button>
            </Box>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <TitleBar title="Title"></TitleBar>
                <Text as="p">text</Text>
                <Button onClick={() => setModalOpen(false)}>Close</Button>
            </Modal>
        </div>
    );
}
