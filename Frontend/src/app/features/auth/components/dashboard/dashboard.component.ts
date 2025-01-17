import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import * as bootstrap from 'bootstrap';
import * as JSZip from 'jszip';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit { 

  username: string = ''; 
  email: string = '';
  thumbnail: string = ''; 
  dropdownOpen: boolean = false;
  isModalOpen: boolean = false; 
  selectedFile: File | null = null; 
  isUploading: boolean = false; 
  

  vendorCount: number = 0; 
  products: any[] = [];
  vendors: any[] = []; 
  categories:any[] = [];

  

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  paginatedProducts: any[] = [];

  files: { name: string, size: string }[] = [];
  selectesFiles: File[] = [];
 isProductModalOpen: boolean = false;
  addProductForm: FormGroup;
  selectedProducts: any[] = [];
   allSelected: boolean = false;

  selectedProductId: number | null = null;
  
 
 constructor(private http: HttpClient, private fb: FormBuilder) {
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      vendor: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      unitPrice: ['', [Validators.required, Validators.min(0)]],
      unit: ['', Validators.required],
      status: ['', Validators.required],
    });
  }


 


  ngOnInit(): void {
    

    this.fetchUserDetails();
    this.getVendorsCount();
    this.getProducts();
    this.getCategories();
    this.getVendors();
    // this.fetchFiles();

    
  }
  // fetchFiles() {
  //   this.http.get<{ name: string, size: string }[]>(`${environment.apiUrl}/auth/files`)
  //     .subscribe((files) => {
  //       this.files = files;
  //     });
  // }

  // // Handle file selection for upload
  // onFileSelect(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.selectedFile = file;
  //     console.log('Selected file:', file);
  //   }
  // }

  // // Upload selected file
  // uploadFiles() {
  //   if (!this.selectedFile) {
  //     alert('Please select a file first.');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('file', this.selectedFile);

  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   this.isUploading = true;

  //   this.http.post(`${environment.apiUrl}/auth/upload-file`, formData, { headers })
  //     .subscribe(
  //       (response: any) => {
  //         console.log('File uploaded successfully:', response);
  //         this.fetchFiles(); // Re-fetch files after upload
  //         this.isUploading = false;
  //       },
  //       (error) => {
  //         console.error('Error uploading file:', error);
  //         this.isUploading = false;
  //       }
  //     );

//   Ensure that your backend has the following endpoints:

// GET /auth/files: To retrieve the list of uploaded files.
// POST /auth/upload-file: To handle file uploads.
// GET /auth/download-file/{filename}: To handle downloading a specific file.
  showDeleteModal(product: any) {
    this.selectedProductId = product.product_id; // Store the product ID to delete
    const modal = new bootstrap.Modal(
      document.getElementById('deleteConfirmationModal')!
    );
    modal.show();
  }
  confirmDelete() {
    if (this.selectedProductId) {
      this.http.delete(`${environment.apiUrl}/auth/products/${this.selectedProductId}`).subscribe(
    
        (response: any) => {
          alert(response.message); // Success message from the backend
          // Update the UI to reflect the deletion
          this.getProducts();
        },
        (error) => {
          alert('Failed to delete the product');
          console.error(error);
        }
      );
    }

    // Close the modal after the operation
    const modal = bootstrap.Modal.getInstance(
      document.getElementById('deleteConfirmationModal')!
    );
    modal?.hide();
  }

  



  downloadProduct(product: any) {
    const doc = new jsPDF();

    // Extract product details excluding image
    const { product_id, product_name, price, description, vendor_name } = product;

    // Add product details to the PDF
    doc.text('Product Details', 20, 20);
    doc.text(`Product ID: ${product_id}`, 20, 30);
    doc.text(`Product Name: ${product_name}`, 20, 40);
    doc.text(`Price: ${price}`, 20, 50);
    doc.text(`Description: ${description}`, 20, 60);
    doc.text(`Vendor: ${vendor_name}`, 20, 70);
    // Save the PDF
    doc.save(`${product_name}_${product_id}.pdf`);
  }


  editProduct(product: any) {
  product.isEditing = true;
  product.originalData = { ...product }; // Store original data in case of cancel
  }
 

saveProduct(product: any) {
  const updatedProductData = {
    product_id:product.product_id,
    product_name: product.product_name,
    category_id: product.category_id,
    quantity_in_stock: product.quantity_in_stock,
    unit_price: product.unit_price,
    product_image: product.product_image,
    status: product.product_status,
    unit: product.unit,
    vendor_id: product.vendor_id, // Include vendor ID
  };

  console.log('Updated product data:', updatedProductData);
  this.http.put(`${environment.apiUrl}/auth/products/${product.product_id}`, updatedProductData)
    .subscribe(
      (response: any) => {
        console.log('Product updated successfully:', response);
        product.isEditing = false;

        if (product.selectedFile) {
          const formData = new FormData();
          formData.append('product_image', product.selectedFile);
          formData.append('productId', product.product_id); // Include product ID in the form data

          const token = localStorage.getItem('token');
          const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
          });

          this.isUploading = true;

          this.http.post(`${environment.apiUrl}/auth/upload-product-image`, formData, { headers })
            .subscribe(
              (uploadResponse: any) => {
                console.log('File uploaded successfully:', uploadResponse);
                product.product_image = uploadResponse.url; // Update the product image URL
                this.isUploading = false;
              },
              (error) => {
                console.error('Error uploading file:', error);
                this.isUploading = false;
              }
            );
        }
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
}

onFileSelectPro(event: any, product: any) {
  const file = event.target.files[0];
  if (file) {
    product.selectedFile = file; // Store the selected file in the product object
    console.log('Selected file:', file);
  }
}

cancelEdit(product: any) {
  Object.assign(product, product.originalData); // Restore original data
  product.isEditing = false;
}
  getCategories() {
    this.http.get<{ categories: any[] }>(`${environment.apiUrl}/auth/categories`)
      .subscribe(
        (response) => {
          this.categories = response.categories;
        },
        (error) => {
          console.error('Error fetching categories:', error);
        }
      );
  }

  getVendors() {
    this.http.get<{ vendors: any[] }>(`${environment.apiUrl}/auth/vendors`)
      .subscribe(
        (response) => {
          this.vendors = response.vendors;
        },
        (error) => {
          console.error('Error fetching vendors:', error);
        }
      );
  }
  
  onCheckboxChange(event: any, product: any): void {
    if (event.target.checked) {
      this.selectedProducts.push(product);
    } else {
      const index = this.selectedProducts.findIndex(p => p.product_id === product.product_id);
      if (index !== -1) {
        this.selectedProducts.splice(index, 1);
      }
    }
  }

onHeaderCheckboxChange(event: any): void {
    this.allSelected = event.target.checked;
    this.products.forEach(product => {
      product.selected = this.allSelected;
      if (this.allSelected) {
        if (!this.selectedProducts.includes(product)) {
          this.selectedProducts.push(product);
        }
      } else {
        this.selectedProducts = [];
      }
    });
  }

  downloadExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.selectedProducts);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Products': worksheet },
      SheetNames: ['Products']
    };

    XLSX.writeFile(workbook, 'selected_products.xlsx');
  }


 openProductModal() {
  this.isProductModalOpen = true;
}
 
closeProductModal() {
  this.isProductModalOpen = false;
}
onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Store the selected file in the selectedFile variable
      console.log('Selected file:', file);
    }
  }
 addProduct() {
    if (this.addProductForm.valid) {
      const productData = this.addProductForm.value;

      this.http.post(`${environment.apiUrl}/auth/products`, productData)
        .subscribe(
          (response: any) => {
            console.log('Product added successfully:', response);
            const newProduct = response.product;
            this.products.push(newProduct); // Update the products array with the new product

            if (this.selectedFile) {
              const formData = new FormData();
              formData.append('product_image', this.selectedFile);
              formData.append('productId', newProduct.product_id); // Include product ID in the form data

              const token = localStorage.getItem('token');
              const headers = new HttpHeaders({
                Authorization: `Bearer ${token}`,
              });
              
              this.isUploading = true;

              this.http.post(`${environment.apiUrl}/auth/upload-product-image`, formData, { headers })
                .subscribe(
                  (uploadResponse: any) => {
                    console.log('File uploaded successfully:', uploadResponse);
                    newProduct.product_image = uploadResponse.url; // Update the product image URL
                    this.isUploading = false;
                    this.closeProductModal();
                    alert('Product added successfully!');
                  },
                  (error) => {
                    console.error('Error uploading file:', error);
                    this.isUploading = false;
                  }
                );
            } else {
              this.closeProductModal();
              alert('Product added successfully!');
            }
          },

               (error) => {
            console.error('Error adding product:', error);
          }
        );
    } else {
      console.error('Form is invalid');
    }
  }





   saveProductData(productData: any) {
    this.http.post(`${environment.apiUrl}/auth/products`, productData)
      .subscribe(
        (response: any) => {
          console.log('Product added successfully:', response);
          this.products.push(response.product); // Update the products array with the new product
          this.closeProductModal();
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
  }

  
  getVendorsCount() {
  this.http.get<{ count: number }>(`${environment.apiUrl}/auth/vendors/count`).subscribe(
    (response) => {
      this.vendorCount = response.count; // Update vendor count
    },
    (error) => {
      console.error('Error fetching vendor count:', error);
    }
  );
}


  getProducts() {
    const params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('limit', this.itemsPerPage.toString());

    this.http.get<{ products: any[], totalItems: number }>(`${environment.apiUrl}/auth/products`, { params })
      .subscribe(
        (response) => {
          console.log("products -", response)
          this.products = response.products;
          this.totalItems = response.totalItems;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.paginatedProducts = this.products;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
  }


  // Navigate to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProducts();
    }
  }

  // Navigate to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getProducts();
    }
  }
   

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Method to verify the token and retrieve user details
  fetchUserDetails() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.http.get(`${environment.apiUrl}/auth/user-details`, { headers })
        .subscribe(
          (response: any) => {
            this.username = response.username;
            this.email = response.email;
            this.thumbnail = response.profile_pic || 'assets/photo.jpg';
          },
          (error) => {
            console.error('Error fetching user details:', error);
            this.logout();
          }
        );
    }
  }

  // Open modal to upload profile photo
  openProfilePhotoModal() {
    this.isModalOpen = true; // Show modal
  }
  openModal() {

    this.isModalOpen = false;

  }
  // Close the modal
  closeModal() {
    this.isModalOpen = false; // Hide modal
  }

  // Handle file selection
  //The onFileChange method is an event handler that is triggered whenever the user selects a file using the <input type="file"> element.
  onFileChange(event: any) {
    const file = event.target.files[0];// Get the first selected file
    if (file) {
      this.selectedFile = file; // Store the selected file in the selectedFile variable
      console.log('Selected file:', file);
    }
  }

  // Upload the profile photo to the backend
  uploadProfilePhoto() {
    if (!this.selectedFile) {
      alert('Please select a file first.');
      return;
    }
  
    const formData = new FormData();
    formData.append('profile_pic', this.selectedFile);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.isUploading = true;

    this.http.post(`${environment.apiUrl}/auth/upload-profile-photo`, formData, { headers })
      .subscribe(
        (response: any) => {
          console.log('File uploaded successfully:', response);
          this.thumbnail = response.url; // Update the profile picture in the UI
          this.isUploading = false;
        },
        (error) => {
          console.error('Error uploading file:', error);
          this.isUploading = false;
        }
      );


      
  }


  // Logout method to clear localStorage and redirect to login page
  logout(): void {
    localStorage.clear(); // Clear the local storage
    window.location.href = '/login'; // Redirect to login page
  }

}