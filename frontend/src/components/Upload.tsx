import { SmallAddIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { Flex, Input, Image, VStack, Button, HStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import deletePicture from "../util/upload/deletePicture";
import uploadPicture from "../util/upload/uploadPicture";

export default function Upload({
  setPicture,
}: {
  setPicture: (picture: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const pictureUrl = await uploadPicture(file);
      console.log(pictureUrl);
      setPicture(pictureUrl);
      setPreview(pictureUrl);
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" my={10}>
      <VStack align="flex-start">
        <HStack w="calc(100vw - 50px)">
          <Button
            colorScheme="blue"
            variant="outline"
            leftIcon={<SmallAddIcon />}
            onClick={() => fileInputRef.current?.click()}
            width="100%"
          >
            点击上传图片
          </Button>
          <Button
            colorScheme="red"
            variant="outline"
            leftIcon={<SmallCloseIcon />}
            onClick={async () => {
              deletePicture(preview!);
              setPreview(null);
              setPicture("");
            }}
            opacity={preview ? 1 : 0}
            width="100%"
          >
            删除当前图片
          </Button>
        </HStack>
        <Input
          type="file"
          accept="image/*"
          onChange={onChange}
          display="none"
          ref={fileInputRef}
          value=""
        />
        {preview && (
          <Image
            src={'/' + preview}
            alt="preview"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        )}
      </VStack>
    </Flex>
  );
}
