import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { Box, Button, Text } from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import React, { useEffect, useState } from "react";

export function ChildrenAllBlogs() {
    const app = useAppBridge();
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        function handleMessageFromModal(ev) {
            console.log("Message received in main app:", ev.data);
        }

        window.addEventListener("message", handleMessageFromModal);
        return () => {
            window.removeEventListener("message", handleMessageFromModal);
        };
    }, []);

    const sendMessageToApp = () => {
        const modal = document.getElementById("my-modal");
        modal.contentWindow.postMessage(
            "Hi, this is the main app!",
            location.origin,
        );
    };
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
            <Modal id="my-modal" src="/" open={modalOpen}>
                <Text as="p">text</Text>
                <TitleBar title="Title"></TitleBar>
            </Modal>
        </div>
    );
}
