import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

type PropType = {
  isOpen: boolean;
  onClose: () => void;
};

const SuccessModal: React.FC<PropType> = ({ isOpen, onClose }) => {
  // const handleCopyText = (text: string) => {
  //   // Use the Clipboard API to copy text
  //   navigator.clipboard
  //     .writeText(text)
  //     .then(() => {
  //       alert("Text copied to clipboard!");
  //     })
  //     .catch((err) => {
  //       console.error("Failed to copy text: ", err);
  //     });
  // };
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent width={"fit"}>
          <ModalHeader>Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <section className="space-y-3">
              <p className="text-sm font-medium text-black/70 flex flex-col items-start gap-2 flex-wrap">
                <span className="text-start text-black/90">
                  You have successfully registered for the event.
                  Congratulations!
                </span>
              </p>
              <p className="text-sm font-medium">
                Please check your email to see the your Pincode / barcode.{" "}
                <br /> That would be presented at the event to allow you gain
                access at the event.
              </p>
            </section>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SuccessModal;
