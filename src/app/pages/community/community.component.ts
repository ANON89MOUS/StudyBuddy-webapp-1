import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from '../../shared/blog/blog.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, BlogComponent,FormsModule],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent {
  likeCount: number = 0;
  commentCount: number = 0;
  commentInput: any;
  selectedImage: string | ArrayBuffer | null = null; // for image upload
  postText: string = ''; // post content text
  posts: Array<{ text: string; image: string | ArrayBuffer | null }> = []; // for storing posts
postDate: string | number | Date | undefined;
document: any;

  constructor(private router: Router) {}

  // Toggle "Read More" content
  toggleMore() {
    const moreText = document.getElementById('more-text');
    const readMore = document.getElementById('read-more');

    if (moreText && readMore) {
      if (moreText.style.display === 'none') {
        moreText.style.display = 'inline';
        readMore.textContent = 'Read Less';
      } else {
        moreText.style.display = 'none';
        readMore.textContent = 'Read More';
      }
    }
  }

  // Increment like count
  incrementLike() {
    this.likeCount++;
  }

  // Toggle comment section visibility
  toggleCommentSection() {
    const commentSection = document.getElementById('comment-section');
    if (commentSection) {
      commentSection.style.display =
        commentSection.style.display === 'none' ? 'block' : 'none';
    }
  }

  // Submit a new comment
  submitComment(commentText: string) {
    if (commentText.trim()) {
      this.addComment(commentText);
      this.clearCommentInput();
    }
  }

  // Add a new comment to the list
  addComment(commentText: string) {
    const commentSection = document.getElementById('comments-list');
    if (commentSection) {
      const newComment = document.createElement('div');
      newComment.classList.add('comment');
      newComment.innerHTML = `
        <div class="comment-user">
          <img src="img/user.png" alt="Profile">
          <span class="comment-username">User123</span>
        </div>
        <p>${commentText}</p>
        <div class="btns">
          <span class="like-btn" (click)="likeComment(this)">
            <i class="fas fa-thumbs-up"></i> 
            <span class="like-count">0</span>
          </span>
        </div>
      `;
      commentSection.appendChild(newComment);
      this.commentCount++;
    }
  }

  // Like comment
  likeComment(btn: HTMLElement) {
    const likeCountElement = btn.querySelector('.like-count');
    if (likeCountElement) {
      let likeCount = parseInt(likeCountElement.textContent || '0', 10);
      likeCount++;
      likeCountElement.textContent = likeCount.toString();
    }
  }

  // Open post modal
  openPostModal() {
    const modal = document.getElementById('post-modal-backdrop');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  // Close post modal
  closePostModal() {
    const modal = document.getElementById('post-modal-backdrop');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // Handle image upload
  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Clear the input for comments after submission
  clearCommentInput() {
    const commentInput = document.getElementById('comment-input') as HTMLInputElement;
    if (commentInput) {
      commentInput.value = '';
    }
  }

  // Submit post (text and/or image)
  submitPost() {
    if (this.postText.trim() || this.selectedImage) {
      this.posts.push({ text: this.postText, image: this.selectedImage });
      this.postText = '';
      this.selectedImage = null;
    } else {
      alert('Please add text or an image before posting.');
    }
  }

  // Navigate to home
  goToHome() {
    this.router.navigate(['/home']);
  }

  // Logout
  logout() {
    this.router.navigate(['/login']);
  }
}
