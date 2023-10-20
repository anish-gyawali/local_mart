import React, { useState, FormEvent } from "react";
import {
  createStyles,
  Text,
  Container,
  TextInput,
  Button,
  Paper,
} from "@mantine/core";

import axios from "axios";

interface Image {
  data: File | null | string;
}

interface FormData {
  name: string;
  userId: number;
  categoriesId: number;
  description: string;
  price: number;
  quantity: number;
  status: string;
  dateAdded: string;
  images: Image[];
}

const Product = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    userId: 0,
    categoriesId: 0,
    description: "",
    price: 0,
    quantity: 0,
    status: "",
    dateAdded: new Date().toISOString(),
    images:[],
  });

  const handleChange = (
    field: keyof FormData,
    value: string | number
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageChange = async (index: number, file: File | null) => {
    const updatedImages = [...formData.images];
  
    if (file) {
      // If a file is provided, convert it to a base64 string
      const base64String = await convertImageToBase64(file);
      if (base64String) {
        updatedImages[index] = { data: base64String };
      }
    } else {
      const currentData = updatedImages[index].data;
      if (currentData && typeof currentData === 'string') {
        // If the data is already a base64 string, leave it as is
      } else {
        console.error('Invalid image data:', currentData);
      }
    }
  
    setFormData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };
  
  const convertImageToBase64 = (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          resolve(null);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };

  const addImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, { data: null }],
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = {
      ...formData,
      images: formData.images.map((image) => {
        if (typeof image.data === 'string') {
          const base64Data = image.data.split(',')[1];
          return {
            Data: base64Data,
          };
        } else {
          return {
            Data: null,
          };
        }
      }),
    };
    try {
      const response = await axios.post(
        "https://localhost:44312/api/products",
        formDataToSend
      );
  
      if (response.status === 201) {
        console.log("Product created successfully");
      } else {
        console.error("Failed to create the product");
      }
    } catch (error) {
      console.error("An error occurred while creating the product:", error);
    }
  };

  const { classes } = useStyles();
  return (
    <Container size="md">
      <Paper shadow="xs" className={classes.product_container}>
        <Text size="xl">Create Product</Text>
        <form onSubmit={handleSubmit}>
        <TextInput
            label="Name"
            required
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <TextInput
            label="User ID"
            type="number"
            required
            value={formData.userId}
            onChange={(e) => handleChange("userId", parseInt(e.target.value))}
          />
          <TextInput
            label="Category ID"
            type="number"
            required
            value={formData.categoriesId}
            onChange={(e) => handleChange("categoriesId", parseInt(e.target.value))}
          />
          <TextInput
            label="Description"
            required
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <TextInput
            label="Price"
            type="number"
            required
            value={formData.price}
            onChange={(e) => handleChange("price", parseFloat(e.target.value))}
          />
          <TextInput
            label="Quantity"
            type="number"
            required
            value={formData.quantity}
            onChange={(e) => handleChange("quantity", parseInt(e.target.value))}
          />
          <TextInput
            label="Status"
            required
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
          />
          <Text size="sm" weight={700} style={{ marginTop: "16px" }}>
            Images
          </Text>
          {formData.images.map((image, index) => (
            <div key={index}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(index, e.target.files ? e.target.files[0] : null)
                }
              />
              <Button
                size="xs"
                variant="light"
                onClick={() => removeImage(index)}
                style={{ marginTop: "8px" }}
              >
                Remove Image
              </Button>
            </div>
          ))}
          <Button
            size="xs"
            variant="light"
            onClick={addImage}
            style={{ marginTop: "16px" }}
          >
            Add Image
          </Button>
          <Button type="submit" style={{ marginTop: "16px" }}>
            Create Product
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Product;

const useStyles = createStyles(() => {
  return {
    product_container: {
      marginTop: "3rem",
      textAlign: "center",
    },
  };
});
