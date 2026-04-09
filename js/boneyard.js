/**
 * Boneyard Skeleton Loader
 * Implements structure-preserving skeleton loading states
 */

document.addEventListener('DOMContentLoaded', () => {
    // Auto-apply Boneyard to specific elements if not manually labeled
    document.querySelectorAll('.glass-card').forEach(el => {
        if (!el.hasAttribute('data-boneyard')) {
            el.setAttribute('data-boneyard', 'shimmer');
        }
    });

    class Boneyard {
        static init() {
            const bones = document.querySelectorAll('[data-boneyard]');
            
            bones.forEach(element => {
                const isImage = element.tagName.toLowerCase() === 'img';
                
                if (isImage && element.complete && element.naturalHeight !== 0) {
                    element.style.opacity = '1';
                    return;
                }

                this.wrapElement(element, isImage);
            });
        }

        static wrapElement(element, isImage) {
            const wrapper = document.createElement('div');
            const boneType = element.getAttribute('data-boneyard') || 'shimmer';
            
            wrapper.className = element.className;
            wrapper.classList.add('boneyard-wrapper');
            wrapper.style.position = 'relative';
            wrapper.style.overflow = 'hidden';
            
            element.parentNode.insertBefore(wrapper, element);
            element.style.opacity = '0';
            wrapper.appendChild(element);

            const bone = document.createElement('div');
            bone.className = `boneyard-bone pointer-events-none`;
            bone.style.position = 'absolute';
            bone.style.inset = '0';
            bone.style.zIndex = '10';
            
            if (boneType === 'shimmer') {
                bone.classList.add('boneyard-theme-shimmer'); 
            } else {
                bone.style.background = 'rgba(255,255,255,0.1)';
            }

            wrapper.appendChild(bone);
            
            if (isImage) {
                element.addEventListener('load', () => this.unwrap(wrapper, bone));
                element.addEventListener('error', () => this.unwrap(wrapper, bone));
                if (element.complete && element.naturalHeight !== 0) {
                     this.unwrap(wrapper, bone);
                }
            } else {
                const delay = parseInt(element.getAttribute('data-boneyard-delay')) || 1200;
                setTimeout(() => this.unwrap(wrapper, bone), delay);
            }
        }

        static unwrap(wrapper, bone) {
            if (!bone.parentNode) return;
            
            bone.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            bone.style.opacity = '0';
            
            setTimeout(() => {
                const element = wrapper.querySelector('[data-boneyard]');
                if (element) {
                    element.style.transition = 'opacity 0.5s cubic-bezier(0.0, 0, 0.2, 1)';
                    element.style.opacity = '1';
                    wrapper.parentNode.insertBefore(element, wrapper);
                }
                wrapper.remove();
            }, 400);
        }
    }

    window.BoneyardRenderer = Boneyard;
    Boneyard.init();
});
