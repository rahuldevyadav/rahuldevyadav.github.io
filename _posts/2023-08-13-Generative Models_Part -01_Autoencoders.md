<div style="background-color:#858593;color:#f2f2e6;padding:20px;">

<center><img src= "images/Title.png" /></center>

<center><u><h1> Part-01 </h1></u></center>


The generative models are unsupervised machine learning techniques. The goal of generative models is _"To learn the mapping between input data and output using distribution and patterns from the input."_

>  The generative models are capable of the learning representation of high-dimensional data onto lower-dimensional vector space, i.e., the parameters of generative models are less than the amount of training data.

<br>

The famous examples of generative models are:
1. Autoencoders
2. GANs
3. Diffusion Models
4. Autoregressive Models

Lets start discussions with "AUTOENCODERS"
_________





<center><h2>"AUTOENCODERS"</h2></center>
<figure><center><img src= "images/autoencoder.jpeg" /><figcaption>Figure 1: Autoencoder Model Architecture[Sourec:  https://editor.analyticsvidhya.com/uploads/98612autoencoder.JPG].</figcaption></center></figuree
<br>
<br>

<p><emph>"Autoencoders"</emph> learns the dense representation of the input and store it in latent representation or coding without any supervision. The dimensions of latent representation are significantly less than the input dimensions. Since autoencoders try to reconstruct the input from stored latent space, hence the term "auto" is used in its name.</p>


Autoencoder is always composed of the following parts:

<ul>
  <li><strong> Bottelneck Layer:</strong> The middlemost layer where the inputs are stored as lower dimensional latent space. </li>
  <li><strong> Encoder or Recognition Network:</strong> That converts input to a latent representation.  </li>
  <li><strong> Decoder or Generative Network:</strong> It reconstructs the input from latent representation. </li>
</ul>


<div style="background-color:#f78888;color:#05073d;padding:18px;">
The bottleneck layer has a lower dimensional representation of input images. The advantages of the bottleneck are, first, that similar images will have similar latent representations, and the second advantage is that by changing the node values of latent space, we can change the output; therefore, it can be used for solving many problems, such as: 
<ul>
  <li>Identifying simmilar images</li>
  <li>Enhancing Images</li>
  <li>Denoising</li>
  <li>Domain Transfer</li>
  <li>Generating New Images</li>
</ul> </div>

In the subsequent sections, we will explore the implementation of autoencoders and their different types+implementations.
_______________________
------------------------
<br>
<br>
<center><h2><u>Section - 1: Implementation of Autoencoder </u></h2></center>

Step1: Importing relevent packages 

<div style="background-color:#e5d992;color:red;padding:18px;">
<strong>Note: </strong> importing torch_snipptes: This package imports all the necessary libraries.  (https://pypi.org/project/torch-snippets/)
</div>


</div>






```python
#importing Lib.
from torch_snippets import *

import torch
import torchvision

from torchvision.datasets import FashionMNIST
from torchvision import transforms

# seting device - cuda if avaialable

device = 'cuda' if torch.cuda.is_available() else 'cpu'

print(f"Torch version : {torch.__version__} & torchvision version: {torchvision.__version__}, Device is set to '{device}'")

```


<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">Torch version : <span style="color: #008080; text-decoration-color: #008080; font-weight: bold">2.0</span>.<span style="color: #008080; text-decoration-color: #008080; font-weight: bold">1</span> &amp; torchvision version: <span style="color: #008080; text-decoration-color: #008080; font-weight: bold">0.15</span>.<span style="color: #008080; text-decoration-color: #008080; font-weight: bold">2</span>, Device is set to <span style="color: #008000; text-decoration-color: #008000">'cuda'</span>
</pre>



<div style="background-color:#858593;color:#f2f2e6;padding:20px;">
Step 2 (a): Loading, transforming and preparing data for training autoencoders. 
</div>


```python
# defining transformatons for images
img_transform = transforms.Compose([transforms.ToTensor(), # convert image to tensor
                                    transforms.Normalize([0.5], [0.5]), # normalizing image with mean 0.5 and std 0.5
                                    transforms.Lambda(lambda x: x.to(device)) # loading data on GPU
                                    ])

# create training and validation dataset (ds) - downloading and saving dataset in "data/content" folder
train_ds = FashionMNIST('data/content', transform = img_transform, train=True, download=True)
val_ds = FashionMNIST('data/content', transform = img_transform, train=False, download=True)

# defining dataloaders:  
BATCH_SIZE = 128
train_dl = DataLoader(train_ds, batch_size=BATCH_SIZE, shuffle=True)
val_dl = DataLoader(val_ds, batch_size=BATCH_SIZE, shuffle=False)
```

    Downloading http://fashion-mnist.s3-website.eu-central-1.amazonaws.com/train-images-idx3-ubyte.gz
    Downloading http://fashion-mnist.s3-website.eu-central-1.amazonaws.com/train-images-idx3-ubyte.gz to data/content/FashionMNIST/raw/train-images-idx3-ubyte.gz


    100%|██████████| 26421880/26421880 [00:10<00:00, 2622417.63it/s]


    Extracting data/content/FashionMNIST/raw/train-images-idx3-ubyte.gz to data/content/FashionMNIST/raw
    
    Downloading http://fashion-mnist.s3-website.eu-central-1.amazonaws.com/train-labels-idx1-ubyte.gz
    Downloading http://fashion-mnist.s3-website.eu-central-1.amazonaws.com/train-labels-idx1-ubyte.gz to data/content/FashionMNIST/raw/train-labels-idx1-ubyte.gz


    100%|██████████| 29515/29515 [00:00<00:00, 194892.72it/s]


    Extracting data/content/FashionMNIST/raw/train-labels-idx1-ubyte.gz to data/content/FashionMNIST/raw
    
    Downloading http://fashion-mnist.s3-website.eu-central-1.amazonaws.com/t10k-images-idx3-ubyte.gz
    Downloading http://fashion-mnist.s3-website.eu-central-1.amazonaws.com/t10k-images-idx3-ubyte.gz to data/content/FashionMNIST/raw/t10k-images-idx3-ubyte.gz


    100%|██████████| 4422102/4422102 [00:01<00:00, 2430278.83it/s]


    Extracting data/content/FashionMNIST/raw/t10k-images-idx3-ubyte.gz to data/content/FashionMNIST/raw
    
    Downloading http://fashion-mnist.s3-website.eu-central-1.amazonaws.com/t10k-labels-idx1-ubyte.gz
    Downloading http://fashion-mnist.s3-website.eu-central-1.amazonaws.com/t10k-labels-idx1-ubyte.gz to data/content/FashionMNIST/raw/t10k-labels-idx1-ubyte.gz


    100%|██████████| 5148/5148 [00:00<00:00, 7476550.20it/s]


    Extracting data/content/FashionMNIST/raw/t10k-labels-idx1-ubyte.gz to data/content/FashionMNIST/raw
    



```python

```
